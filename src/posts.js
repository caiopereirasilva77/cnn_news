import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import {Filter, ReferenceInput, DateInput, DateField,
        Create, SimpleForm, SelectInput, TextInput,
        List, SimpleList, Datagrid, TextField, 
        ReferenceManyField, ReferenceField, Edit, EditButton, } from 'react-admin';


export const PostCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
          <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="title" />
           <TextInput multiline source="body" />
           <DateInput label="Publication date"  source="published_at" defaultValue={new Date()} />
           
      </SimpleForm>
  </Create>
);

const PostTitle = ({ record }) => {
      return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = props => (
  <Edit title={<PostTitle />} {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
          <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="title" />
           <TextInput multiline source="body" />
           <DateInput label="Publication date" source="published_at" />
           <ReferenceManyField label="Comments" reference="comments" target="post_id">
                <Datagrid>
                    <TextField source="body" />
                    <DateField source="created_at" />
                    <EditButton/>
                </Datagrid>
            </ReferenceManyField>


      </SimpleForm>
  </Edit>
);

const PostFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
  </Filter>
);

export const PostList = (props) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return ( 
  <List filters={<PostFilter />} {...props} title="Posts List">
    {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toDateString()}
                />
    ) : (
        <Datagrid>
              <TextField source="id" />
              <ReferenceField label="User" source="userId" reference="users">
              <TextField source="name" />
              </ReferenceField>
              <TextField source="title" />
              <TextField source="body" />
              <DateField sorce="published_at" defaultValue={Date()}/>
             
              <EditButton />
        </Datagrid>
    )}
  </List>
);
    }
