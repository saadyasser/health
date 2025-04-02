import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'username',
      type: 'text',
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'date',
      type: 'text',
      required: false,
    },
    {
      name: 'time',
      type: 'text',
      required: false,
    },
    {
      name: 'age',
      type: 'text',
      required: false,
    },
    {
      name: 'gender',
      type: 'text',
      required: false,
    },
    {
      name: 'heartRate',
      type: 'text',
      required: false,
    },
    {
      name: 'bloodPressure',
      type: 'text',
      required: false,
    },
    {
      name: 'temperature',
      type: 'text',
      required: false,
    },
    {
      name: 'oxygonSaturation',
      type: 'text',
      required: false,
    },
    {
      name: 'reportedsymptoms',
      type: 'text',
      required: false,
    },

  ],
}
