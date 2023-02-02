# Project description
This website is used for watching anime. It allows you to store a custom link to your preferred streaming service and start watching in one click. You can also store watch progress data. You an export and import all your data using a json file. You can log in with your google account to have your data sync accross all your devices.

The website uses react, express and mongoDB. The user data is stored in local storage. If the user logs in, user data is attached to their google account id and then sent to the backend database. The anime data comes from the Anilist Api (https://anilist.gitbook.io/anilist-apiv2-docs/).

Link to deployment: https://anilink.netlify.app/

![screenshot](/Screenshot.png?raw=true "screenshot")

# Another anime list website?

So how is this one different than the well-established anime list websites out there?

**TLDR:** To fit my specific needs (and possibly some other people’s needs), I need a website to store both my watch progress and a unofficial url (ie. anime1, yinghua…) where I can watch the show in one click.

I read Chinese subtitles faster and so I prefer watching anime with Chinese subs. However I could not find any legal streaming service that offers Chinese subtitles. They either require a VPN which causes lag when watching (Bilibili), or do not offer Chinese subtitles at all(Crunchyroll etc..). Many people's solution to this is to look at third party websites(ie. anime1, yinghua…). These services are great but they don't offer watch progress tracking, and you need to go to websites like MAL to manually document your watch progress. I also need a separate system to keep track of the actual url to watch the anime because MAL does not allow you to save a url with each anime. 

I want to combine the two functionalities in one place, the watch progress documentation of MAL and the URL storing of browser bookmarks.
