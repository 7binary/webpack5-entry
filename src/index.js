import $ from 'jquery';
import Logo from '@/assets/logo.png';
import json from '@/data/info.json';
import xml from '@/data/file.xml';
import csv from '@/data/airtravel.csv';
import './styles/main.css';
import './styles/blocks.scss';
import Post from '@models/Post';
import './babel-test'

const firstPost = new Post('First one', Logo);
$('pre').addClass('code').html(firstPost.toString());

console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);
