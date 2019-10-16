import React from 'react';
import { observer } from 'mobx-react';
import {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
} from './preview/';

const DRAFTS = {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
};

const DraftItem = ({ item }) => {
  const Draft = DRAFTS[`${item.type}Draft`];
  return <Draft item={item}></Draft>;
};

export default observer(DraftItem);
