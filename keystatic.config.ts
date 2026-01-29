// keystatic.config.ts
import { SubscriberCard } from '@/components/ros-ui/subscriber-card';
import { YouTube } from '@/components/ui/youtube';
import { config, fields, collection } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Docs',
      slugField: 'title',
      path: 'content/docs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({label: 'Description'}),
        content: fields.mdx({ 
            label: 'Rich text',
            components: {
                ConnectionGuard: wrapper({
                    label: 'ConnectionGuard',
                    schema: {
                        docsLink: fields.text({label: 'link'})
                    }
                }),
                Teleop: block({
                    label: 'Teleop',
                    schema: {}
                }),
                SubscriberCard: block({
                    label: 'SubscriberCard',
                    schema: {
                        topic: fields.text({label: 'topic'}),
                        type: fields.text({label: 'message type'}),
                    }
                }),
                YouTube: block({
                    label: 'YouTube',
                    schema: {
                        id: fields.text({label: 'id'})
                    }
                })
            }
        }),
      },
    }),
  },
});