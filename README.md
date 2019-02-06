Was developed with JetBrains Rider.

# How to run locally

## C# part

1. Edit `appsettings.Development.json` and anter your MySQL database credentials.
2. Run `dotnet ef database update`
3. Start project from IDE. It will start backend API.

## Frontend part

1. Install NodeJS and Yarn.
2. Run `yarn install`.
3. Run `npm run dev-start`. It will start frontend web server on local port `8082`.
4. Ensure `js/config/config-dev.json` contain valid base URL to the backend.

## How to use

* Registration is available with any email/username, no validation is made.
* Password can be of any symbols 3 and more characters.
* Main functionality is to load public property transactions data provided by Japanese government and show it in a grid.
