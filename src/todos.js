import React from 'react';
import jsonExport from 'jsonexport/dist';
import { List, Datagrid, TextField, downloadCSV,
         Create, SimpleForm, TextInput, ReferenceInput,
         Filter, Edit, SelectInput, BooleanField, BooleanInput } from 'react-admin';

const exporter = (records, fetchRelatedRecords) => {
  // will call dataProvider.getMany('todos', { ids: records.map(record => record.user_id) }), ignoring duplicate and empty user_id
  fetchRelatedRecords(records, 'user_id', 'todos').then(todos => {
      const data = records.map(record => ({
              ...record,
              todo_title: todos[record.user_id].name,
      }));
      jsonExport(data, {
          headers: ['id', 'user_id', 'todo_title', 'completed'],
      }, (err, csv) => {;
          downloadCSV(csv, 'todos');
      });
  });
};

export const TodoList = props => (
  <List filters={<TodoFilter />} {...props} title='Todos List'exporter={exporter} >
      <Datagrid rowClick="edit">
          <TextField source="userId"/>
          <TextField disabled source="id" />
          <TextField source="title" />
          <BooleanField source="completed" />
     
      </Datagrid>
  </List>
);

export const TodoCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
          <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput  source="title" />
          <BooleanInput source="completed" />
           
           
      </SimpleForm>
  </Create>
);


export const TodoEdit = props => (
  <Edit title={<todoTitle />} {...props}>
      <SimpleForm>
           <TextInput disabled source="id" />
          <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="title" />
           <BooleanInput source="completed" />
           
      </SimpleForm>
  </Edit>
);

const TodoFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
  </Filter>
);
