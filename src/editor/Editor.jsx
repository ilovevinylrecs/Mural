import React from 'react';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { WorkspaceConsumer } from '../WorkspaceContext';

import ImageBackgroundForm from './ImageBackgroundForm';
import ImageParallaxForm from './ImageParallaxForm';
import CentredTextForm from './CentredTextForm';
import HorizontalSlideshowForm from './HorizontalSlideshowForm';
import Layout from './Layout';

const StoryForms = {
  ImageBackgroundForm,
  ImageParallaxForm,
  CentredTextForm,
  HorizontalSlideshowForm,
};

const Editor = props => {
  const {
    match: {
      params: { itemNum },
    },
  } = props;

  const storyIndex = parseInt(itemNum, 10);

  return (
    <WorkspaceConsumer>
      {({ storyState }) => {
        const item = storyState.items[storyIndex];
        const clonedItem = clone(item);
        const Component = StoryForms[`${clonedItem.type}Form`];
        return (
          <Layout>
            <Component
              draftItem={clonedItem}
              onSave={() => {
                applySnapshot(
                  storyState.items[storyIndex],
                  getSnapshot(clonedItem),
                );
              }}
            />
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default Editor;
