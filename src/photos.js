import React from 'react';
import {Create, SimpleForm, ReferenceInput, SelectInput,
        TextInput, List, Datagrid, TextField, Edit,
        ImageInput, ImageField,Title } from 'react-admin';


export const PhotoCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
           
          <ReferenceInput source="albumId" reference="albums">
               <SelectInput optionText="title" />
          </ReferenceInput>
          <TextInput source="title" />
          <ImageInput source="pictures" label="Related pictures" accept="image/*">
              <ImageField source="src" title="title" />
          </ImageInput>
      </SimpleForm>
  </Create>
);

export const PhotoList = props => (
  <List {...props} title='Photos List'>
     <Datagrid>
          <TextField source="albumId">
          <TextField source="id" />
          <TextField source="title" />
      
    </Datagrid>
  </List>
);


export const PhotoEdit = (props) => (
  <Edit {...props}>
      <SimpleForm>
          <Title label="Title" />
          <ImageInput source="pictures" label="Related pictures" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>

      </SimpleForm>
  </Edit>
);




