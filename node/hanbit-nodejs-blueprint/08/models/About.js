var keystone = require('keystone');
var Types = keystone.Field.Types;

var About = new keystone.List('About', {
	// 지도를 사용하여 관리 인터페이스에 ObjectId 대신에 제목 표시
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

About.add({
	title: { type: String, initial: true, default: '', required: true},
	description: { type: Types.Textarea }
});

About.defaultColumns = 'title, description|60%';

About.register();
