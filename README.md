# <img src="templates/images/logo/logo32x32.png"/>  News Nova

A tiny little news search powered by Newscatcher API: https://rapidapi.com/organization/newscatcher-api. Logo inspired by N(orth)E(ast)W(est)S(outh) with Tibetian colors associated with cardinal direction as written in https://en.wikipedia.org/wiki/Cardinal_direction. The UI is powered by bootstrap: https://getbootstrap.com/ and axios: https://github.com/axios/axios. The main functionality of search is written in vanilla JS. It is responsive.

Demo: https://www.youtube.com/watch?v=CcI0M_WWutA

## Installation
* Clone this repo
```
git clone https://github.com/Wrishi/newsnova.git
```
* Navigate to project folder
```
cd newsnova
```
* Setting up a conda environment is adviced
```
conda create -n novanews python=3.8
conda activate novanews
```
* Install requirements.txt
```
pip install -r requirements.txt
```
* Create a .env file and set up your environment variables.
```
NEWSCATCHER_API_ENDPOINT=https://newscatcher.p.rapidapi.com/v1/search_free or https://newscatcher.p.rapidapi.com/v1/search
NEWSCATCHER_API_KEY=<YOUR_API_KEY>
NEWSCATCHER_API_HOST=newscatcher.p.rapidapi.com
```
* You can find you Newscatcher API key by following the instructions here: https://free-docs.newscatcherapi.com/#authentication
* The endpoint https://newscatcher.p.rapidapi.com/v1/search is limited by certain amount of searches a day. When that is exhausted you can use https://newscatcher.p.rapidapi.com/v1/search_free. There was no visible difference when this app was tested.
* Run the web app
```
python server.py
```
* Access the search page at http://localhost:7876
