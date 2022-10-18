## Background

This repositiory is meant as a starting point to rapidly deploy serverless resources to the AWS cloud. Several sample service integrations are provided and can be used as examples when developing real use cases:

- REST API

![aws-serverless-basic](https://user-images.githubusercontent.com/2487315/86035559-c87f4280-b9f9-11ea-8e55-3937504c2eca.png)

## Prerequisites

#### 1. Install Node

NodeJS can be installed directly from https://nodejs.org/en/download/. If using linux or macos [NVM](https://github.com/nvm-sh/nvm) is highly recommended. This repo uses Node 16.

This repo has a .nvmrc file to specify required node version. If using nvm, run `nvm use` to switch to project version (16)

#### 2. Install Yarn

Yarn is an ultra fast, reliable, and secure dependency management system. Installation instructions available at https://classic.yarnpkg.com/en/docs/install.

#### 3. Install Serverless

Serverless (with a capital S) is an open source development framework which does a great job automating common AWS tasks. The easiest way to install globally is with npm: `npm install -g serverless`

## Quickstart

1. Clone repository
1. Run `yarn install`
1. Update project name in `serverless.yml` and create a layer for node dependencies
    1. Run `yarn install-layer` to package up dependency layer
1. Update `serverless.yml` to reference your own api key stored in Parameter Store (SSM). 
    1. For key value, you should generate a new UUID
    1. For key name, construct it with the appName
1. Replace `aws-serverless-basic` with project name in `aws-iam-policy.json`
1. Replace `dev1-eu-de` with desired region in `aws-iam-policy.json`
1. Create AWS IAM policy from `aws-iam-policy`
1. Setup local aws credentials with policy access
    1. Navigate to your user's home directory on your computer (for example `/Users/johndoe/`)
    1. Create a `.aws` folder if it does not already exist
    1. Navigate into your new `.aws` folder
    1. Create a file called `credentials`
    1. Open your new `credentials` file
    1. Include your access and secret key within the file like the below
        1.  ```
            [default]
            region = us-west-2
            aws_access_key_id = accessKeyHere
            aws_secret_access_key = secretKeyHere
            ```
1. Execute decrypt command based on the environment you want to deploy to
    1. `yarn decrypt --stage <env> --password secret_password`
        1. Example: `yarn decrypt --stage dev --password secret_password`
1. To run offline use `sls offline -s <stage_name>`
    1. Example: `sls offline -s dev1-eu-de`
1. Deploy with `sls deploy -s <stage_name>`
    1. Example: `sls deploy -s dev1-eu-de`

## Code Configuration Notes

This project uses prettier, tsconfig, webpack, and eslint to enforce code formatting and style, as well as to minify and package deployed code. The specefic settings in each configuration file are not themselves important and most are developer preferences. The important takeaway is that everyone should be using the same rules to avoid whitespace merge conflicts and to follow a set of standards.

_Configuration Guides:_

- [prettier](https://prettier.io/docs/en/configuration.html)
- [tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [webpack](https://webpack.js.org/configuration/)
- [eslint](https://eslint.org/docs/user-guide/configuring)

## Working with Serverless

Serverless is an evolving framework with continuously growing capabilities. This project is not meant to emphasize what the framework is fully capable of, but rather how it can be used to quickly move the the Cloud. Serverless supports multiple cloud providers, but this project is specifically using AWS.

There are [dozens of serverless commands](https://www.serverless.com/framework/docs/providers/aws/), becoming familiar with them will help ease development.

For this project there are only a couple times you will need to use serverless commands directly:

#### Secrets

Sensitive information is setup to be in a `secrets.${stage}.yml` file (ex `secrets.dev.yml`). These files are unencrypted and should _never_ be commited to source control. Instead, you can use Serverless to encrypt them and then commit those files.

- `serverless encrypt --stage ${aStage} --password ${thePassword}`
- `serverless decrypt --stage ${aStage} --password ${thePassword}`

#### Local Testing

We utilize a plugin called [Serverless Offline](https://github.com/dherault/serverless-offline) for local testing. This is primarily used to test lambdas and apis locally:

- `serverless offline`

#### Tearing Down

A single serverless command is used to remove every AWS resource provisioned in the project:

- `serverless remove`
## aws-reference-sys-api-poc
