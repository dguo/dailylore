function generate_units()
{

var sources = []
sources[0] = ["People", "entertainment", "http://www.people.com/people/", "Lea Michele Gets Cheeky in Revealing Bikini Pic During Mexico Getaway", "http://feeds.people.com/~r/people/headlines/~3/2nBg4opTK68/0,,20772377,00.html", "Alicia Rhett Dies at 98", "http://feeds.people.com/~r/people/headlines/~3/XGldWfXXbSE/0,,20772374,00.html", "Justin Bieber and Selena Gomez Reunited: See His Sweet Instagram Photo", "http://feeds.people.com/~r/people/headlines/~3/W6fdwvcr4zs/0,,20772375,00.html"];
sources[1] = ["The Huffington Post", "politics", "http://www.huffingtonpost.com/", "Orgasm School: A Coming Trend?", "http://www.huffingtonpost.com/2014/01/03/orgasm-school_n_4538924.html", "A Look Inside Kate Bosworth's Wedding Weekend (PHOTOS)", "http://www.huffingtonpost.com/2014/01/03/kate-bosworth-wedding-_n_4538516.html", "This Little Boy From India Has A Message We Won't Be Forgetting Anytime Soon", "http://www.huffingtonpost.com/2014/01/03/share-care-joy-naik-found_n_4538782.html"];
sources[2] = ["Rolling Stone", "entertainment", "http://www.rollingstone.com/", "Billie Joe Armstrong and Norah Jones Remember Phil Everly", "http://www.rollingstone.com/music/news/billie-joe-armstrong-and-norah-jones-remember-phil-everly-20140104", "Jon Favreau's Wall Street Education", "http://www.rollingstone.com/movies/news/jon-favreaus-wall-street-education-20140104", "Phil Everly, Everly Brothers Vocal Legend, Dead at 74", "http://www.rollingstone.com/music/news/phil-everly-everly-brothers-vocal-legend-dead-at-74-20140103"];
sources[3] = ["ABC News", "a.general", "http://abcnews.go.com/", "Don Everly Receives 'Special Spiritual Message'", "http://feeds.abcnews.com/c/35229/f/654824/s/357fd3ab/sc/7/l/0Labcnews0Bgo0N0CEntertainment0CwireStory0Cdon0Eeverly0Ereceives0Especial0Espiritual0Emessage0E21421748/story01.htm", "Saul Zaentz, Producer of Oscar Winners, Dies at 92", "http://feeds.abcnews.com/c/35229/f/654824/s/357fd1c2/sc/17/l/0Labcnews0Bgo0N0CEntertainment0CwireStory0Csaul0Ezaentz0Eproducer0Eoscar0Ewinners0Edies0E920E21421689/story01.htm", "Phil Everly and Brother Were Architects of Harmony", "http://feeds.abcnews.com/c/35229/f/654824/s/357fd2aa/sc/38/l/0Labcnews0Bgo0N0CEntertainment0CwireStory0Cphil0Eeverly0Ebrother0Earchitects0Eharmony0E21421697/story01.htm"];
sources[4] = ["The Washington Post", "politics", "http://www.washingtonpost.com/", "She The People: What Ani DiFranco reminds us about modern racism and slavery", "http://feeds.washingtonpost.com/c/34656/f/636655/s/357f70a2/sc/17/l/0L0Swashingtonpost0N0Cblogs0Cshe0Ethe0Epeople0Cpost0Cwhat0Eani0Edifranco0Ereminds0Eus0Eabout0Emodern0Eracism0Eand0Eslavery0C20A140C0A10C0A40Cc76cc980A0E75680E11e30Ebc6b0E712d770Ac37150Iblog0Bhtml0Dwprss0Frss0Ipolitics/story01.htm", "Balz: What voter turnout means for efforts to remedy income inequality", "http://feeds.washingtonpost.com/c/34656/f/636655/s/357f38d7/sc/1/l/0L0Swashingtonpost0N0Cpolitics0Cwhat0Evoter0Eturnout0Emeans0Efor0Eefforts0Eto0Eremedy0Eincome0Einequality0C20A140C0A10C0A40Cdbf6cb4c0E75510E11e30Ebc6b0E712d770Ac37150Istory0Bhtml0Dwprss0Frss0Ipolitics/story01.htm", "GovBeat: Boeing machinists agree to 777X contract on narrow vote", "http://feeds.washingtonpost.com/c/34656/f/636655/s/357ef05d/sc/30/l/0L0Swashingtonpost0N0Cblogs0Cgovbeat0Cpost0Cboeing0Emachinists0Eagree0Eto0E777x0Econtract0Eon0Enarrow0Evote0C20A140C0A10C0A40Cc5bbcf840E755c0E11e30Ebc6b0E712d770Ac37150Iblog0Bhtml0Dwprss0Frss0Ipolitics/story01.htm"];
sources[5] = ["USA Today", "a.general", "http://www.usatoday.com/", "Death toll rises in Northeast storm; record lows likely", "http://rssfeeds.usatoday.com/~r/usatoday-NewsTopStories/~3/31dHRlKedng/", "Phil Everly lent perfect pitch to brothers' harmonies", "http://rssfeeds.usatoday.com/~r/usatoday-NewsTopStories/~3/DH86j29jPsA/", "Five things that will be cheaper in 2014", "http://rssfeeds.usatoday.com/~r/usatoday-NewsTopStories/~3/Jwo7Z9pzxNQ/"];
sources[6] = ["NPR", "a.general", "http://www.npr.org/", "Former First Lady Barbara Bush Released From Hospital", "http://www.npr.org/blogs/thetwo-way/2014/01/04/259669415/former-first-lady-barbara-bush-released-from-hospital?ft=1&f=1001", "How Cold Is It? It's So Cold That ...", "http://www.npr.org/blogs/thetwo-way/2014/01/04/259663729/how-cold-is-it-its-so-cold-that?ft=1&f=1001", "How One Man Won $324M And Didn't Realize It For 2 Weeks", "http://www.npr.org/blogs/thetwo-way/2014/01/04/259659404/how-one-man-won-324m-and-didnt-realize-it-for-2-weeks?ft=1&f=1001"];
sources[7] = ["The New York Times", "a.general", "http://www.nytimes.com/", "Top Militant Said to Die After Arrest in Lebanon", "http://www.nytimes.com/2014/01/05/world/middleeast/top-militant-said-to-die-after-arrest-in-lebanon.html?partner=rss&emc=rss", "Afghanistan’s Worsening, and Baffling, Hunger Crisis", "http://www.nytimes.com/2014/01/05/world/asia/afghanistans-worsening-and-baffling-hunger-crisis.html?partner=rss&emc=rss", "Boeing Workers Approve 8-Year Contract Extension", "http://www.nytimes.com/2014/01/05/business/boeing-workers-approve-contract-tied-to-777x.html?partner=rss&emc=rss"];
sources[8] = ["The Wall Street Journal", "business", "http://online.wsj.com/home-page", "Boeing Union Approves Contract", "http://online.wsj.com/article/SB10001424052702304325004579299610258941436.html?mod=rss_whats_news_us", "Auto Makers Rebound as Buyers Go Big", "http://online.wsj.com/article/SB10001424052702303870704579298142769322998.html?mod=rss_whats_news_us", "U.K. Struggles in Fight Against Insider Trading", "http://online.wsj.com/article/SB10001424052702303640604579296520563211360.html?mod=rss_whats_news_us"];
sources[9] = ["Amazon.com", "z.daily", "http://www.amazon.com/?&linkCode=ur2&tag=thdalo00-20", "Deal of the Day: Mio Alpha Strapless Heart Rate Monitor", "http://www.amazon.com/dp/B00BJ6HLDI/ref=xs_gb_rss_A1KE3VMOFJBXQL/?ccmID=380205&tag=thdalo00-20&linkCode=ur2", "Healthy Cooking and 33% off T-fal Ultimate Stainless Steel Copper-Bottom 12-Piece Cookware Set", "http://www.amazon.com/dp/B001KS6N7U/ref=xs_gb_rss_A1KBS1NIVKXTVH/?ccmID=380205&tag=thdalo00-20&linkCode=ur2", "$70 off Philips O'Neill CRASH Headphones", "http://www.amazon.com/dp/B00AMLJTFO/ref=xs_gb_rss_A2YYRKFMWASFJZ/?ccmID=380205&tag=thdalo00-20&linkCode=ur2"];
sources[10] = ["The Drudge Report", "politics", "http://www.drudgereport.com/", "MINNESOTA 'WORST' DEEP FREEZE IN 20 YEARS...", "http://feedproxy.google.com/~r/DrudgeReportFeed/~3/mEQzltYV8wU/", "GOVERNOR ORDERS SCHOOLS CLOSED STATEWIDE MONDAY DUE TO COLD...", "http://feedproxy.google.com/~r/DrudgeReportFeed/~3/G95N4F8VSFg/", "KILLER CHILLER MAP...", "http://feedproxy.google.com/~r/DrudgeReportFeed/~3/Vnep_kGBGUg/uschill.gif"];
sources[11] = ["Yahoo! News", "a.general", "http://news.yahoo.com/", "Kerry cites some progress in Mideast diplomacy", "http://news.yahoo.com/kerry-cites-progress-mideast-diplomacy-152245556--politics.html", "Obama eyes modest momentum on Capitol Hill in 2014", "http://news.yahoo.com/obama-eyes-modest-momentum-capitol-hill-2014-134451018--finance.html", "Death toll in latest Egypt clashes rises to 17", "http://news.yahoo.com/death-toll-latest-egypt-clashes-rises-17-110453640.html"];
sources[12] = ["Politico", "politics", "http://www.politico.com/", "The congressman who went off the grid", "http://www.politico.com/magazine/story/2014/01/roscoe-bartlett-congressman-off-the-grid-101720.html", "Universities hire politician presidents", "http://www.politico.com/story/2014/01/university-presidents-politicians-101738.html", "The Obamacare fixer", "http://www.politico.com/story/2014/01/the-obamacare-fixer-101737.html"];
sources[13] = ["Ars Technica", "technology", "http://arstechnica.com/", "Gallery: Ars talks to Babylon 5 and Game of Thrones actors at Space City Con", "http://feeds.arstechnica.com/~r/arstechnica/index/~3/z7vejp8QZUs/", "Coinye West: A new cryptocurrency for the masses and an ode to Kanye", "http://feeds.arstechnica.com/~r/arstechnica/index/~3/gC3lwz6dNMc/", "Active ingredient in pot sets off a feedback that reduces intoxication", "http://feeds.arstechnica.com/~r/arstechnica/index/~3/BD-iiEhtu5s/"];
sources[14] = ["TechCrunch", "technology", "http://techcrunch.com/", "Gillmor Gang: Competitive Blocking", "http://feedproxy.google.com/~r/Techcrunch/~3/knuOjdAk_RA/", "This Week On The TC Gadgets Podcast: CES! CES? CES!", "http://feedproxy.google.com/~r/Techcrunch/~3/q-VlaJV0rKo/", "Publish And Perish? What To Do With That Book Inside Of You", "http://feedproxy.google.com/~r/Techcrunch/~3/9NuFaoLhXvQ/"];
sources[15] = ["SB Nation", "sports", "http://www.sbnation.com/", "Steelers expected to keep Todd Haley", "http://www.sbnation.com/nfl/2014/1/4/5273538/todd-haley-steelers-job-status", "J.R. Smith, Knicks lose on yet another in late-game blunder", "http://www.sbnation.com/nba/2014/1/4/5273526/jr-smith-knicks-lose-late-game-blunder", "Cam Ward injury: No timetable for Hurricane goalie's return", "http://www.sbnation.com/nhl/2014/1/4/5273530/cam-ward-lower-body-injury-no-timetable-for-return-carolina-hurricanes"];
sources[16] = ["Bleacher Report", "sports", "http://bleacherreport.com/", "Cold Hard Fact for January 4, 2014", "http://bleacherreport.com/articles/1910997-cold-hard-fact-for-january-4-2014", "Miami vs. Syracuse: Live Score, Updates and Analysis", "http://bleacherreport.com/articles/1910908-miami-vs-syracuse-live-score-updates-and-analysis", "Chris Weidman: 'I Honestly Would Feel Bad' Fighting Anderson Silva Again", "http://bleacherreport.com/articles/1910919-chris-weidman-i-would-honestly-feel-bad-fighting-anderson-silva-again"];
sources[17] = ["ESPN", "sports", "http://espn.go.com/", "Boyd, Watkins help Clemson tip Ohio State", "http://scores.espn.go.com/ncf/recap?gameId=340030194", "Reports: Strong likely to accept Texas offer", "http://espn.go.com/college-football/story/_/id/10240886/charlie-strong-louisville-cardinals-expected-take-texas-longhorns-job", "Paul out 3-5 weeks for separated shoulder", "http://espn.go.com/los-angeles/nba/story/_/id/10240357/los-angeles-clippers-chris-paul-3-5-weeks-separated-shoulder"];
sources[18] = ["CBS News", "a.general", "http://www.cbsnews.com/", "Violence erupts in Cambodia as labor dispute intensifies; four dead", "http://feeds.cbsnews.com/~r/CBSNewsWorld/~3/KAj_IE6KpBY/", "Egypt police clash with Islamist supporters ahead of referendum", "http://feeds.cbsnews.com/~r/CBSNewsWorld/~3/jWKzIvUoQl8/", "Indonesian volcano continues to spew", "http://feeds.cbsnews.com/~r/CBSNewsWorld/~3/8QsZadRmVSU/"];
sources[19] = ["CNBC", "business", "http://www.cnbc.com/", "Chobani shrinks cup but not price", "http://www.cnbc.com/id/101309099", "BlackBerry: We won't excuse this Typo", "http://www.cnbc.com/id/101308919", "Automakers make big high-tech push", "http://www.cnbc.com/id/101308518"];
sources[20] = ["Discovery", "science_and_health", "http://news.discovery.com/", "Each Step on Smart Hallway Helps Power School", "http://news.discovery.com/tech/alternative-power-sources/students-walking-smart-hallway-help-power-school-140104.htm#mkcpgn=rssnws1", "Tasty Tech Eye Candy Of The Week (Jan 4)", "http://news.discovery.com/tech/gear-and-gadgets/tasty-tech-eye-candy-week-jan-4-140104.htm#mkcpgn=rssnws1", "Astronauts Work to Make Water That Burns", "http://news.discovery.com/space/astronauts-work-to-make-water-that-burns-140103.htm#mkcpgn=rssnws1"];
sources[21] = ["Business Insider", "business", "http://www.businessinsider.com/", "A Delivery Man Won $324M Jackpot And Didn't Realize For Two Weeks", "http://feedproxy.google.com/~r/businessinsider/~3/VmTSF-wFDeQ/delivery-man-is-missing-us-mega-millions-winner-2014-1", "Here's An Incredible Picture Of Sun Shining Through The Windows Of A Building After It Caught Fire", "http://feedproxy.google.com/~r/businessinsider/~3/nDw4wgJphuY/sun-shines-through-the-windows-of-a-building-after-it-caught-fire-2014-1", "23 Successful Actors Who Dropped Out Of High School", "http://feedproxy.google.com/~r/businessinsider/~3/Dq5r_mjhedw/celebrity-high-school-dropouts-2014-1"];
sources[22] = ["Wired", "technology", "http://www.wired.com/", "Ben Wheatley Wants to Make You Feel Responsible for Murder in <em>Sightseers</em>", "http://feeds.wired.com/~r/wired/index/~3/L8Us9OivKCg/", "How <em>Iron Man 3</em> Flipped the Script on Female Characters", "http://feeds.wired.com/~r/wired/index/~3/xtjaiMY0KKQ/", "Biometric Database of All Adult Americans Hidden in Immigration Reform", "http://feeds.wired.com/~r/wired/index/~3/crXQgPEF9co/"];
sources[23] = ["BuzzFeed", "random", "http://www.buzzfeed.com/", "Are You A Psychopath?", "http://www.buzzfeed.com/abefg/are-you-a-psychopath", "33 Songs That Will Turn 10 In 2014", "http://www.buzzfeed.com/perpetua/songs-that-will-turn-10-in-2014", "Why I Feel OK About Falling Off The Wagon After Years Of Sobriety", "http://www.buzzfeed.com/joeberkowitz/why-i-feel-okay-about-falling-off-the-wagon-after-years-of-s"];
sources[24] = ["BBC News", "a.general", "http://www.bbc.co.uk/news/", "New flood fears on UK rivers and coasts", "http://www.bbc.co.uk/news/uk-25606031#sa-ns_mchannel=rss&ns_source=PublicRSS20-sa", "Briton shot dead in Libya named", "http://www.bbc.co.uk/news/uk-25603868#sa-ns_mchannel=rss&ns_source=PublicRSS20-sa", "Iraq government 'loses Fallujah'", "http://www.bbc.co.uk/news/world-middle-east-25605459#sa-ns_mchannel=rss&ns_source=PublicRSS20-sa"];
sources[25] = ["Reuters", "a.general", "http://www.reuters.com/", "Bangladesh election marred by opposition boycott, violence", "http://feeds.reuters.com/~r/reuters/topNews/~3/E5RHECikPJk/story01.htm", "Kerry sees progress on Israeli-Palestinian framework deal", "http://feeds.reuters.com/~r/reuters/topNews/~3/OvGLqqEMWmI/story01.htm", "Early days of Obamacare bring trickle, not flood, of patients", "http://feeds.reuters.com/~r/reuters/topNews/~3/P4kOA1j5IFs/story01.htm"];
sources[26] = ["Sports Illustrated", "sports", "http://sportsillustrated.cnn.com/", "Texas, Charlie Strong in negotiations for Longhorns' coaching job", "http://sportsillustrated.cnn.com/college-football/news/20140104/texas-longhorns-charlie-strong-negotiations-louisville/?xid=si_topstories", "The Playbook: Previewing all four wild-card weekend matchups", "http://nfl.si.com/2014/01/03/nfl-wild-card-weekend-preview/?xid=si_topstories", "Richard Sherman: The five smartest NFL QBs", "http://mmqb.si.com/2014/01/03/richard-sherman-smartest-nfl-quarterbacks/?xid=si_topstories"];
sources[27] = ["Science", "science_and_health", "http://news.sciencemag.org/", "Top Stories: Bad Bug Breath, &#039;Jumping&#039; Schizophrenia, and a Supersensitive Earth", "http://news.sciencemag.org/scientific-community/2014/01/top-stories-bad-bug-breath-jumping-schizophrenia-and-supersensitive", "Video: Spiders Spin Electric Web", "http://news.sciencemag.org/environment/2014/01/video-spiders-spin-electric-web", "ScienceShot: An Illustrated Guide to Hippo Castration", "http://news.sciencemag.org/plants-animals/2014/01/scienceshot-illustrated-guide-hippo-castration"];
sources[28] = ["Cracked", "random", "http://www.cracked.com/", "4 Package Deliverymen Who Lost Their Minds on the Job", "http://feedproxy.google.com/~r/CrackedRSS/~3/usReb6km4Lc/", "4 Things I Learned from the Worst Online Dating Profile Ever", "http://feedproxy.google.com/~r/CrackedRSS/~3/NF9gsYDJGPs/", "5 Fantasy Characters That Need to Be Rebooted", "http://feedproxy.google.com/~r/CrackedRSS/~3/wAgUVddKtHQ/"];
sources[29] = ["WebMD", "science_and_health", "http://www.webmd.com/", "What 'Brain-Dead' Means", "http://www.webmd.com/brain/news/20140103/brain-dead-faq?src=RSS_PUBLIC", "Younger Adults Who've Had Shingles May Face Higher Stroke Risk", "http://www.webmd.com/stroke/news/20140103/younger-adults-whove-had-shingles-may-face-higher-stroke-risk?src=RSS_PUBLIC", "Daycare Surfaces May Hold Germs Longer Than Thought", "http://www.webmd.com/parenting/news/20140103/daycare-surfaces-may-hold-germs-longer-than-thought?src=RSS_PUBLIC"];
sources[30] = ["Entertainment Weekly", "entertainment", "http://www.ew.com/", "Phil Everly, Rock Hall of Famer, dies at 74", "http://feeds.ew.com/~r/entertainmentweekly/latest/~3/wqnOBr17rXo/", "'Veronica Mars' trailer: Look who's back (and new)!", "http://feeds.ew.com/~r/entertainmentweekly/latest/~3/3qoxvfQdYWk/", "'Bachelor' supertease: 'Juan Pablo, I hope he dies'", "http://feeds.ew.com/~r/entertainmentweekly/latest/~3/cwtY5Qyd4Cs/"];
sources[31] = ["CNN", "a.general", "http://www.cnn.com/", "Shame on SnapChat, Skype", "http://rss.cnn.com/~r/rss/cnn_topstories/~3/nxcWbGclCRM/index.html", "Gingrich: No 'small soy latte liberalism'", "http://rss.cnn.com/~r/rss/cnn_topstories/~3/iXhy24Y3Fc0/index.html", "Woman lives off Starbucks for year", "http://rss.cnn.com/~r/rss/cnn_topstories/~3/oxtzYHsVwas/only-starbucks-products-for-a-year-existence-newday.cnn.html"];
sources[32] = ["Lifehacker", "random", "http://lifehacker.com/", "Top 10 Apps and Services That Are More Than Meets the Eye", "http://feeds.gawker.com/~r/lifehacker/full/~3/-P4Gq7SmZaE/top-10-apps-and-services-that-are-more-than-meets-the-e-1491631328", "Clean Your Oven with an Overnight Pot of Water and Ammonia", "http://feeds.gawker.com/~r/lifehacker/full/~3/WwrS8nfn9E0/clean-your-oven-with-an-overnight-pot-of-water-and-ammo-1493972869", "Create Some Better Habits This Weekend", "http://feeds.gawker.com/~r/lifehacker/full/~3/KQkPK8-MWKQ/create-some-better-habits-this-weekend-1493514849"];
sources[33] = ["Mashable", "technology", "http://mashable.com/", "Facebook: We Are Not Collecting Unpublished Posts and Comments", "http://feeds.mashable.com/~r/Mashable/~3/1tWliF3r_7E/", "5 Reasons Why CES Still Matters", "http://feeds.mashable.com/~r/Mashable/~3/HSOGbhj2pa0/", "Top 10 Tech This Week: Food Printers and Eye-Controlled Gaming", "http://feeds.mashable.com/~r/Mashable/~3/FWx8GCnqmQ4/"];
sources[34] = ["Popular Science", "science_and_health", "http://www.popsci.com/", "Glass Viruses And Other Amazing Images From This Week", "http://feeds.popsci.com/c/34567/f/632419/s/357a5e6c/sc/5/l/0L0Spopsci0N0Carticle0Cscience0Cglass0Eviruses0Eand0Eother0Eamazing0Eimages0Eweek/story01.htm", "Q&A: How Legal Is The NSA's Interception Of Computers?", "http://feeds.popsci.com/c/34567/f/632419/s/3579dfc4/sc/4/l/0L0Spopsci0N0Carticle0Cgadgets0Cqa0Ehow0Elegal0Ensas0Einterception0Ecomputers/story01.htm", "From Untold Billions To None: How Passenger Pigeons Went Extinct", "http://feeds.popsci.com/c/34567/f/632419/s/3579c27d/sc/10/l/0L0Spopsci0N0Carticle0Cscience0Cuntold0Ebillions0Enone0Ehow0Epassenger0Epigeons0Ewent0Eextinct/story01.htm"];
sources[35] = ["Forbes", "business", "http://www.forbes.com/", "Best- And Worst-Performing Cloud Computing Stocks Of 2013", "http://www.forbes.com/sites/louiscolumbus/2014/01/04/best-and-worst-performing-cloud-computing-stocks-of-2013/", "BMW Performance Team for Sochi 2014 Olympic Winter Games", "http://www.forbes.com/pictures/mkk45jkdj/bmw-bobsled/", "BMW-Designed Bobsled Barreling Toward First Olympic Gold For U.S. In 78 Years", "http://www.forbes.com/sites/joannmuller/2014/01/04/bmw-designed-bobsled-barreling-toward-first-olympic-gold-for-u-s-in-78-years/"];
sources[36] = ["NBC News", "a.general", "http://www.nbcnews.com/", "Bipartisan group of senators reaches deal on gun trafficking", "http://pheedo.msnbc.msn.com/click.phdo?i=3cdc220f9eb067d92d770bd6bfcae5e0", "EPA nomination sets stage for court struggles on climate change", "http://pheedo.msnbc.msn.com/click.phdo?i=80d64e1e53f47a820c231df28c992ce9", "Michelle Obama: I don't talk about weight with my daughters", "http://pheedo.msnbc.msn.com/click.phdo?i=71df56095e1b9e80e53e1b53f664bc00"];
sources[37] = ["E! Online", "entertainment", "http://www.eonline.com/", "5 Biggest Stories of the Week: Celebrity of the Year Winner, Robin Roberts Comes Out as Gay", "http://feeds.eonline.com/~r/eonline/topstories/~3/ZstgnW6dMgU/5-biggest-stories-of-the-week-celebrity-of-the-year-winner-robin-roberts-comes-out-as-gay", "Justin Bieber Reunites With Selena Gomez—See the Sweet Pic!", "http://feeds.eonline.com/~r/eonline/topstories/~3/6ILP1J1Qsnw/justin-bieber-reunites-with-selena-gomez-see-the-sweet-pic", "Lea Michele Gets Cheeky in a Thong Bikini While Vacationing in Mexico—See the Pic!", "http://feeds.eonline.com/~r/eonline/topstories/~3/BF2Qw8o2Fek/lea-michele-gets-cheeky-in-a-thong-bikini-while-vacationing-in-mexico-see-the-pic"];
sources[38] = ["Reddit", "random", "http://www.reddit.com/", "Old motherboard looks like Ancient Greece", "http://www.reddit.com/r/funny/comments/1ud8mo/old_motherboard_looks_like_ancient_greece/", "Protesting with a mirror", "http://www.reddit.com/r/pics/comments/1ue1g4/protesting_with_a_mirror/", "Steve Martin on Tom Hanks", "http://www.reddit.com/r/funny/comments/1ud72y/steve_martin_on_tom_hanks/"];
sources[39] = ["Fox News", "a.general", "http://www.foxnews.com/", "RECORD COLD'Polar vortex' covers much of US with frigid temps", "http://www.foxnews.com/weather/2014/01/04/polar-vortex-to-blast-frigid-air-over-much-us/", "FAIR PUNISHMENT?WWII vet, 88, spends nightin jail over cracked wall", "http://www.foxnews.com/us/2014/01/04/wwii-vet-88-cant-afford-repairs-to-business-lands-in-jail/?intcmp=latestnews", "Study: ObamaCare to increase ER visits", "http://www.foxnews.com/politics/2014/01/04/study-suggests-medicaid-expansion-will-lead-to-more-emergency-room-visits-under/"];

/* randomly sort the sources */
sources.sort(function() {return 0.5 - Math.random()} );

/* now sort by category */
sources.sort(function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });

/* splice in Amazon */
var Amazon = sources[sources.length - 1]
sources.splice(sources.length - 1, 1);
sources.splice(3, 0, Amazon);

var number_of_rows = Math.ceil(sources.length / 4);

var currentCategory = "null";

for (i = 0; i < number_of_rows; i++) {
    
    var container_row = document.createElement("div");
    container_row.className = "container row" + i;
    
    var row = document.createElement("div");
    row.className = "row";
    container_row.appendChild(row);
    
    var unit1 = document.createElement("div");
    unit1.className = "threecol";
    
    var unit2 = document.createElement("div");
    unit2.className = "threecol";
    
    var unit3 = document.createElement("div");
    unit3.className = "threecol";
    
    var unit4 = document.createElement("div");
    unit4.className = "threecol last";
    
    for (j = 0; j < 4; j++) {
        
        var index = (i * 4) + j;
        if (index < sources.length) {
            
            /* set id attributes for first row of each category, excluding Amazon.com */
            if (sources[index][1] != currentCategory && sources[index][0] != "Amazon.com") {
                container_row.id = sources[index][1];
                currentCategory = sources[index][1];
            }
            
            var unit_top = document.createElement("div");
            var unit_bottom = document.createElement("div");
            
            unit_top.className = "unit-top";
            unit_bottom.className = "unit-bottom";
            
            var category = sources[index][1];
            if (category == "a.general") unit_bottom.className = unit_bottom.className + " white";
            else if (category == "business") unit_bottom.className = unit_bottom.className + " green";
            else if (category == "entertainment") unit_bottom.className = unit_bottom.className + " purple";
            else if (category == "politics") unit_bottom.className = unit_bottom.className + " brown";
            else if (category == "random") unit_bottom.className = unit_bottom.className + " black";
            else if (category == "science_and_health") unit_bottom.className = unit_bottom.className + " blue";
            else if (category == "sports") unit_bottom.className = unit_bottom.className + " red";
            else if (category == "technology") unit_bottom.className = unit_bottom.className + " orange";
            else if (category == "z.daily") unit_bottom.className = unit_bottom.className + " gold";
            
            // put logo and link to home page in top part of unit
            var source_logo_name = sources[index][0].replace(/ /g, "_") + ".png";
            var source_logo_location = "logos/" + source_logo_name;
            var logo_tag = '<img src="' + source_logo_location + '" alt="' + sources[index][0] + '" style="padding:5px;"/>';
            var gaq_call = 'onClick="' + "_gaq.push(['_trackEvent', 'Refer', 'Home page', '" + sources[index][0] + "']);" + '"';
            var name_tag = '<a href="' + sources[index][2] + '" ' + gaq_call + '>' + sources[index][0] + '</a>';
            unit_top.innerHTML = logo_tag + '<br>' + name_tag;    
            
            // put links in list in bottom part of unit
            var bottomHTML = "<ul>";
                        
            for (k = 3; k + 1 < sources[index].length; k = k + 2) {
                var gaq_call_2 = 'onClick="' + "_gaq.push(['_trackEvent', 'Refer', 'Link', '" + sources[index][0] + "']);" + '"';
                bottomHTML = bottomHTML + '<li><a href="' + sources[index][k+1] + '" ' + gaq_call_2 + '>' + sources[index][k] + '</li></a>';
            }
            
            unit_bottom.innerHTML = "<p>" + bottomHTML + "</ul></p>";
            
            if (j == 0) {
                unit1.appendChild(unit_top);
                unit1.appendChild(unit_bottom);
            }
            else if (j == 1) {
                unit2.appendChild(unit_top);
                unit2.appendChild(unit_bottom);
            }
            else if (j == 2) {
                unit3.appendChild(unit_top);
                unit3.appendChild(unit_bottom);
            }
            else if (j == 3) {
                unit4.appendChild(unit_top);
                unit4.appendChild(unit_bottom);
            }
        }
    }
    
    row.appendChild(unit1);
    row.appendChild(unit2);
    row.appendChild(unit3);
    row.appendChild(unit4);
    
    document.body.appendChild(container_row);
}

var last_row = document.createElement("div");
last_row.innerHTML = '<center><a href="about.html" alt="Attributions">Attributions</a></center>';
document.body.appendChild(last_row);

} 