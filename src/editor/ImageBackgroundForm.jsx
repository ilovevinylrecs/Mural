import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  FormGroup,
  Fieldset,
  Legend,
  Label,
  FormText,
  Button,
  ButtonGroup,
} from '@bootstrap-styled/v4';

import MediaPreviewField from './bites/MediaPreviewField';
import Renditions from './Renditions';

import { Title, Subtitle, Body, NavEntry } from './bites';
import FormLayout from './FormLayout';

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

function ImageBackgroundForm(props) {
  const { draftItem, onSave } = props;
  return (
    <FormLayout draftItem={draftItem}>
      <NavEntry />
      <Fieldset>
        <Legend>Item Content</Legend>
        <Title
          title={draftItem.title}
          changeTitle={draftItem.changeTitle}
        />
        <Subtitle
          subtitle={draftItem.subtitle}
          changeSubtitle={draftItem.changeSubtitle}
        />
        <Body
          body={draftItem.body}
          changeBody={draftItem.changeBody}
        />
      </Fieldset>
      <Fieldset>
        <FormGroup>
          <Label>Background Image</Label>
          <MediaPreviewField
            media={draftItem.image}
            onUpdate={(path, name) => {
              draftItem.image.uploadFile(path, name);
            }}
            acceptedMimeTypes={[
              'image/jpeg',
              'image/png',
              'image/webp',
            ]}
          >
            {({ preview }) => (
              <>
                <Img src={preview} alt="Feature image preview" />
                <FormText color="muted">Feature Image</FormText>
              </>
            )}
          </MediaPreviewField>
          <Renditions image={draftItem.image}></Renditions>
        </FormGroup>
      </Fieldset>
      <Fieldset>
        <Label>Audio</Label>
        <MediaPreviewField
          media={draftItem.audio}
          onUpdate={(path, name) => {
            draftItem.audio.uploadFile(path, name);
          }}
          acceptedMimeTypes={[
            'audio/mpeg',
            'audio/ogg',
            'audio/vorbis',
            'audio/opus',
          ]}
        >
          {({ preview }) => (
            <>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio src={preview} alt="Audio" controls />
              <FormText color="muted">Background Audio</FormText>
            </>
          )}
        </MediaPreviewField>
      </Fieldset>
      <ButtonGroup>
        <Button color="secondary">Cancel</Button>
        <Button color="secondary">Reset</Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </ButtonGroup>
    </FormLayout>
  );
}

export default observer(ImageBackgroundForm);
