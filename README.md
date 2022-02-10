Thanks to Sam Meech-Ward for this tutorial: https://www.youtube.com/watch?v=NZElg91l_ms&t=1s on sending images to S3

Thanks to web dev simplifed https://www.youtube.com/watch?v=7Q17ubqLfaM&t=95s for helping with understanding JWT

**TODO**

<ul>
    <li>Move and scale image inside container</li>
    <li>Learn CI</li>
</ul>

Bugs:

<ul>
<li>App.tsx login request sent two times. Because loginrequestsend doesn't happen instantly</li>

</ul>

Deploy Server:

docker build -t hawaiidev/hawaiidevblog:{index} .

docker tag {imageID} registry.heroku.com/hawaii-dev-blog/web

heroku login

docker ps

heroku container:login

heroku container:push web -a hawaii-dev-blog

heroku container:release web
