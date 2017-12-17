# Git Sync

#### Clones all repositories, public or private, of a specified user or organization.
#### Credentials are required, they are present in a file named .gitsync.json place in the home folder.

### Installation:
```
~$ sudo npm install -g gitsync
```

### Usage:

#### For user:
```
~$ gitsync --name <github username>
```

#### For organization:
```
~$ gitsync --org --name <github organization>
```
##### The description is used to determine the exact path to which the repository will be cloned.
##### If the description is empty, or if it contains spaces, the default path is used, `./<repository name>`.

### Examples:
Repository description: `path/to/folder` -> Will clone the repository in `./path/to/folder/<repository name>`

Repository description: `Some description` -> Will clone the repository in `./<repository name>`

Empty repository description -> Will clone the repository in `./<repository name>`


### Authentication:
##### The following file, .gitsync.json, must be placed in the home folder and is required for authentication with the GitHub API:

##### If you only want to clone public repositories:
```
{
  "user": <github username>
}
```
##### If you want to clone private repositories as well:
```
{
  "user": <github username>,
  "at": <github API access token>
}
```
##### To run the tests as well, the file must look like this:
```
{
  "user": <github username>,
  "at": <github API access token>
  "test_repo_1": {
    "name": <repo name>,
    "full_name": <repo full name>
    "local_path": <local path to which the repo will be cloned>
  },
  "test_repo_2": {
    "name": <repo name>,
    "full_name": <repo full name>
    "local_path": <local path to which the repo will be cloned>
  }
}
```
##### You can place the file yourself or you could run `~$ gitsync --cred` which will prompt for user name and Github API access token.
```
~$ gitsync --cred
```
##### If you try to use the script without the `.gitsync.json` file present in the home folder, you will be prompted to initialize it, and execution will continue after the file is created.
##### *Note*: You could omit the access token. The script will still work but *only* for public repositories.

* * *

# API Reference

## init_cred
Initializes/updates git credentials

<a name="exp_module_init_cred--module.exports"></a>

### module.exports() ⇒ <code>Promise</code> ⏏
Reads file with credentials, prompts for creation if not found and for update if found.
Creates/Updates credentials.

**Kind**: Exported function  
**Returns**: <code>Promise</code> - Resolves to the the output of fs.writeFile or to message: 'Credentials not updated'  

## get_all_repos_names
Gets all user's or org's repos names

<a name="exp_module_get_all_repos_names--module.exports"></a>

### module.exports(name, org, user, at) ⇒ <code>type</code> ⏏
**Kind**: Exported function  
**Returns**: <code>type</code> - description  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>type</code> | description |
| org | <code>type</code> | description |
| user | <code>type</code> | description |
| at | <code>type</code> | description |


## is_path_valid
Checks for validity of path, must be string and satisfy

<a name="exp_module_is_path_valid--module.exports"></a>

### module.exports(path) ⇒ <code>boolean</code> ⏏
**Kind**: Exported function  
**Returns**: <code>boolean</code> - Whether path is valid  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path under which to clone a repo |


## clone_repo
Clones a repo in path specified if path is valid. Else, clones to cwd

<a name="exp_module_clone_repo--module.exports"></a>

### module.exports(repo, at) ⇒ <code>Promise</code> ⏏
**Kind**: Exported function  
**Returns**: <code>Promise</code> - Resolves to the path under which the repo was cloned  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>object</code> | Repository info |
| repo.name | <code>string</code> |  |
| repo.full_name | <code>string</code> |  |
| repo.local_path | <code>string</code> | local path to which the repo will be cloned |
| at | <code>string</code> | Github authentication token |