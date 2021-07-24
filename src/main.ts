import * as core from '@aws-cdk/core';
import { PipelineStack } from 'aws-cdk-staging-pipeline';
import { StaticSite } from './static-site';

const app = new core.App();

new PipelineStack(app, 'todolist-ui-pipeline', {
  stackName: 'todolist-ui-pipeline',
  // Account and region where the pipeline will be build
  env: {
    account: '296025538260',
    region: 'ap-northeast-1',
  },
  // Staging Accounts e.g. dev qa prod
  stageAccounts: [{
    account: {
      id: '296025538260',
      region: 'ap-northeast-1',
    },
    stage: 'dev',
  }, {
    account: {
      id: '296025538260',
      region: 'ap-northeast-1',
    },
    stage: 'prod',
  }],
  branch: 'pipeline',
  repositoryName: 'aws-cdk-todolist-ui',
  buildCommand: 'cd frontend && yarn install && yarn build && cd ..',
  customStack: (scope, stageAccount) => {
    const staticSite = new StaticSite(scope, `todolist-stack-${stageAccount.stage}`, {
      stackName: `todolist-ui-stack-${stageAccount.stage}`,
      stage: stageAccount.stage,
    });
    return staticSite;
  },
  // all stages need manual approval
  manualApprovals: (stageAccount) => stageAccount.stage === 'prod',

  gitHub: {
    owner: 'yibin7',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'yibin7-github-token',
    }),
  },
});

app.synth();
