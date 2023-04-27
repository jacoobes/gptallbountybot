(for bountybot only)
https://discord.com/oauth2/authorize?client_id=1100146637814378538&scope=bot&permissions=397284584528

dev:
Make a .env file in root director:
```
DICORD_TOKEN=yourdiscordtoken

```
`yarn run start`

I used [sern](https://sern.dev) as the framework to create this bot.
An attempt to get the bounty for discord bot that is integrated with gpt4all

Being open source, feel free to hack it :D

At the moment, it can answer simple questions. No inference contexts or model switching yet. gpt-j support has not been integrated

You'll need to install the llama models and put it in root directory. (its too fat to put on github)
