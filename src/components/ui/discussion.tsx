'use client';

import Giscus from '@giscus/react';
import { Callout } from 'fumadocs-ui/components/callout';

export function Discussion() {
  return (
    <div>
      <Giscus
        id="comments"
        repo="kabot-io/.github"
        repoId="R_kgDOLO-iUA"
        category="Announcements"
        categoryId="DIC_kwDOLO-iUM4C1ezc"
        mapping="title"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme="noborder_gray"
        lang="en"
      />
      <Callout type="info" title="Discussion powered by Giscus">
        If you prefer not to authorize the Giscus GitHub App, you can participate directly in the
        <a href='https://github.com/orgs/kabot-io/discussions'> GitHub Discussions </a>
        on our repository.
      </Callout>
    </div>
  );
}


