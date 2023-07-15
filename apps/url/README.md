Three things you would do to improve the quality of the codebase in order of importance:

- Add comments to explain functionality to others (and myself) in the future. Purpose statements and signatures for some functions could significantly improve code-readability.
- I would remove the ``app`` app into a different GitHub repository in order to make version-control easier and track changes with less effort. This would also more easily allow for deployment on services like Heroku and Vercel. With the current project structure this will be difficult, with ``package.json`` long with many dependencies that are not necessarily used for ``url``.
- Lastly, I would use a database different from sqlite. As sqlite is hosted locally, it does not allow scalability, which can be a problem once I deploy my app on a server and have thousands of people using it. Since SQLite is designed as a file-based database system, it does not have a dedicated server process. This limits its ability to support distributed or remote access scenarios. If multiple clients need to access the database simultaneously over a network, a client-server database would be a better choice. Therefore the best option is to use MySQL or PostgreSQL.

Improvements added to the app:

- Input sanitization to only allow entering URLs and not text
- QR Code generation upon valid submission of URL
- Added page to record how many times a shortened url is visited (``/s/c/{id}``)