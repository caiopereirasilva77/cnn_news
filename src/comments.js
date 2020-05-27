import React from 'react';
import jsonExport from 'jsonexport/dist';
import { List, Datagrid, TextField, EmailField, downloadCSV,
         Create, SimpleForm, TextInput, ReferenceInput,
         DateInput, Filter, Edit, SelectInput, 

} from 'react-admin';

const exporter = (records, fetchRelatedRecords) => {
  // will call dataProvider.getMany('posts', { ids: records.map(record => record.post_id) }), ignoring duplicate and empty post_id
  fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
      const data = records.map(record => ({
              ...record,
              post_title: posts[record.post_id].title,
      }));
      jsonExport(data, {
          headers: ['id', 'post_id', 'post_title', 'body'],
      }, (err, csv) => {;
          downloadCSV(csv, 'comments');
      });
  });
};

export const CommentList = props => (
  <List filters={<CommentFilter />} {...props} title='Comments List'exporter={exporter} >
      <Datagrid rowClick="edit">
          <TextField source="postId"/>
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="body"/>
     
      </Datagrid>
  </List>
);

export const CommentCreate = (props) => (
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


export const CommentEdit = props => (
  <Edit title={<commentTitle />} {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
          <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="title" />
           <TextInput multiline source="body" />
           <DateInput label="Publication date" source="published_at" />
      </SimpleForm>
  </Edit>
);

const CommentFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
  </Filter>
);
