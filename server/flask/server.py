from flask import Flask
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

key = "api_key=4e3c06c4f9ca541c9e94a0b488f30b2b"
host = "https://api.themoviedb.org/3/"
img_path = 'https://image.tmdb.org/t/p/w500';
avatar_path = 'https://image.tmdb.org/t/p/original';
backdrop_placeholder = 'N/A';
poster_placeholder = 'assets/img/poster.png';
video_placeholder = 'tzkWB85ULJY';
avatar_placeholder = 'assets/img/avatar.jpeg';
website = {'imdb_id': 'imdb.com/name/', 'facebook_id': 'facebook.com/',
				'instagram_id': 'instagram.com/', 'twitter_id': 'twitter.com/'}


urls = {'search': host+'search/multi?'+key+'&language=en-US&query=',
	'trending': [host+'trending/', '/day?'+key],
	'top': [host, '/top_rated/?language=en-US&page=1&'+key],
	'nowPlaying': [host, '/now_playing?language=en-US&page=1&'+key],
	'popular': [host, '/popular?language=en-US&page=1&'+key],
	'recommend': [host, '/recommendations?language=en-US&page=1&'+key],
	'similar': [host, '/similar?language=en-US&page=1&'+key],
	'video': [host, '/videos?language=en-US&page=1&'+key],
	'detail': [host, '?language=en-US&page=1&'+key],
	'review': [host, '/reviews?language=en-US&page=1&'+key],
	'cast': [host, '/credits?language=en-US&page=1&'+key],
	'castDetail': [host, '?language=en-US&page=1&'+key],
	'castEx': [host, '/external_ids?language=en-US&page=1&'+key]}

fields = {'search':['id', 'name', 'backdrop_path', 'media_type'],
	'trending':['id', 'name', 'poster_path'],
	'top': ['id', 'name', 'poster_path'],
	'nowPlaying': ['id', 'name', 'backdrop_path'],
	'popular': ['id', 'name', 'poster_path'],
	'recommend': ['id', 'name', 'poster_path'],
	'similar': ['id', 'name', 'poster_path'],
	'video': ['site', 'type', 'name', 'key'],
	'detail': ['name', 'genres', 'spoken_languages', 'release_date',
			'runtime', 'overview', 'vote_average', 'tagline', 'poster_path'],
	'review': ['author', 'content', 'created_at', 'url', 'rating', 'avatar_path'],
	'cast': ['id', 'name', 'character', 'profile_path'],
	'castDetail': ['birthday', 'gender', 'name', 'homepage', 'place_of_birth',
			'also_known_as', 'known_for_department', 'biography', 'profile_path'],
	'castEx': ['imdb_id', 'facebook_id', 'instagram_id', 'twitter_id']}



def sendRequest(url):
	response = requests.get(url)
	res = response.json()
	results = res["results"] if 'results' in res else res
	return results


def extractFields(res, api):
	results = []
	for r in res:
		results.append(extractFromOne(r, api))
	return results

def extractFromOne(res, api):
	field = fields[api];
	results = {};

	for f in field:
		results[f] = res[f]
		if f=='backdrop_path':
			results[f] = img_path+results[f] if results[f]!=None else backdrop_placeholder
		elif f == 'poster_path':
			results[f] = img_path+results[f] if results[f]!=None else poster_placeholder
		elif f == 'profile_path':
			results[f] = img_path+results[f] if results[f]!=None else 'N/A'
		elif f == 'key':
			results[f] = results[f] if (results[f]!=None) else video_placeholder

		if results[f]==None or results[f]=="":
			results[f] = 'N/A'

	return results

def updateNameField(res):
	if 'name' not in res:
		res['name'] = res['title']

def updateDetailFields(res):
	updateNameField(res)
	if 'release_date' not in res:
		res['release_date'] = res['first_air_date']
	if 'runtime' not in res:
		res['runtime'] = res['episode_run_time']

def updateReviewFields(res):
	res['rating']=res['author_details']['rating']
	res['avatar_path']=res['author_details']['avatar_path']

	if res['avatar_path']==None:
		res['avatar_path'] = avatar_placeholder;
	elif res['avatar_path'][:6]=='/http:' or res['avatar_path'][:7]=='/https:':
		res['avatar_path'] = res['avatar_path'][1:];
	else:
		res['avatar_path'] = avatar_path + res['avatar_path']

def updateCastExFields(res):
	for f in fields['castEx']:
		if res[f] != None:
			res[f] = 'https://'+website[f]+res[f]


def filterSearch(res):
	results=[]
	for r in res:
		if r['media_type']=='tv' or r['media_type']=='movie':
			results.append(r)
	return results


''' api/ movie|tv / trending|top|nowPlaying|popular '''

@app.route("/api/<type>/<api>")
def get_movies(type, api):
	url = urls[api][0]+type+urls[api][1]
	res = sendRequest(url)
	for r in res:
		updateNameField(r)
	results = extractFields(res, api)
	return {"results": results}


''' api/ movie|tv / recommend|similar|video|detail|review|cast / id
	api/ person / castDetail|castEx '''

@app.route("/api/<type>/<api>/<id>")
def get_details(type, api, id):
	url = urls[api][0]+type+'/'+id+urls[api][1]
	res = sendRequest(url)
	if api=='detail':
		updateDetailFields(res)
	elif api=='recommend' or api=='similar':
		for r in res:
			updateNameField(r)
	elif api=='cast':
		res = res['cast']
	elif api=='review':
		for r in res:
			updateReviewFields(r)
	elif api=='castEx':
		updateCastExFields(res)
	
	if isinstance(res, list):
		results = extractFields(res, api)
	else:
		results = extractFromOne(res, api)

	return {"results": results}

''' api/search/query '''
@app.route("/search/<query>")
def get_search_results(query):
	url = urls['search']+query
	res = sendRequest(url)

	res = filterSearch(res)
	for r in res:
		updateNameField(r)
	results = extractFields(res, 'search')
	return {"results": results}


