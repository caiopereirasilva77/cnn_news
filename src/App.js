import React from 'react';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import { UserList } from './users';
import { AlbumList, AlbumCreate } from './albums';
import { PhotoList, PhotoCreate, PhotoEdit } from './photos';
import { TodoList, TodoCreate, TodoEdit } from './todos';
import { CommentList, CommentEdit, CommentCreate,  } from './comments';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import AlbumIcon from '@material-ui/icons/Album';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CommentIcon from '@material-ui/icons/Comment';
import { createMuiTheme } from '@material-ui/core';
import './App.css';



const myTheme = createMuiTheme({
    sidebar: {
        width: 300, // The default value is 240
        closedWidth: 70, // The default value is 55
        backgroundColor:'#DC143C'
    },
   
    });

const App = () => (
   
    <Admin  theme={myTheme} dashboard={Dashboard} authProvider={authProvider} dataProvider={jsonServerProvider('http://jsonplaceholder.typicode.com')}>
          <Resource name="posts"  list={PostList} edit={PostEdit} icon={PostIcon} create={PostCreate} />
          <Resource name="users" list={UserList} icon={UserIcon}/>
          <Resource name="albums" list={AlbumList} icon={AlbumIcon} create={AlbumCreate} />
          <Resource name="photos" list={PhotoList} icon={AddAPhotoIcon} create={PhotoCreate} edit={PhotoEdit}/>
          <Resource name="todos" list={TodoList} icon={AssignmentIcon} create={TodoCreate} edit={TodoEdit}/>
          <Resource name="comments" list={CommentList} create={CommentCreate} edit={CommentEdit} icon={CommentIcon} />

      </Admin>
);

export default App;
