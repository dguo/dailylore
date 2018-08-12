# Legacy

The Daily Lore is the first public website I ever made. I didn't know how to
dynamically generate web pages at the time, so my awful hack was to use a
Python script that would recreate `generate_units.js` with the data inside it.
The website was served from Amazon S3, and the Python script ran in a micro EC2
instance as a cron job. Eventually, the EC2 instance was terminated by Amazon
(I forget why), and I didn't bother to recreate it, so the headlines stopped
being updated. I decided to resurrect the website when I saw [News
API](https://newsapi.org) on [Product Hunt](https://www.producthunt.com), but I
am preserving this [legacy page](https://www.dailylore.com/legacy/) as an
easter egg and as a reminder to myself of how much I have learned since then.
