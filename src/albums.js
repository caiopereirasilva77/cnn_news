import React from 'react';
import { Create, SimpleForm, List, TextInput,
         ReferenceInput, SelectInput, Datagrid,
         TextField } from 'react-admin';


export const AlbumCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
          <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput  source="title" />
          
           
           
      </SimpleForm>
  </Create>
);

export const AlbumList = props => (
  <List {...props} title='Albums List'>
      <Datagrid rowClick="edit">
          <TextField source="userId"/>
          <TextField source="id" />
          <TextField source="title"/>
          
      </Datagrid>
  </List>
);
