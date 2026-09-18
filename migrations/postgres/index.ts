import * as migration_20260917_195306_initial_stories from './20260917_195306_initial_stories';

export const migrations = [
  {
    up: migration_20260917_195306_initial_stories.up,
    down: migration_20260917_195306_initial_stories.down,
    name: '20260917_195306_initial_stories'
  },
];
