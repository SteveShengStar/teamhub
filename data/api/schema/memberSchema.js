import { schema } from 'normalizr';

const interest = new schema.Entity('interests', {}, { idAttribute: '_id' });
const memberType = new schema.Entity('memberTypes', {}, { idAttribute: '_id' });
const skill = new schema.Entity('skills', {}, { idAttribute: '_id' });
const subteam = new schema.Entity('subteams', {}, { idAttribute: '_id' });
const project = new schema.Entity('projects', {}, { idAttribute: '_id' });
const stream = new schema.Entity('streams', {}, { idAttribute: '_id' });

const member = new schema.Entity(
  'members',
  {
    skills: [skill],
    interests: [interest],
    memberType,
    subteam,
    project,
    stream
  },
  {
    idAttribute: '_id'
  }
);

export default {
  body: [member]
};
