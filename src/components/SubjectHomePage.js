import React from 'react';
import { history } from '../routes/AppRouter';
import database from '../firebase/firebase';
import Header from './Header';
import ShortAnnouncements from './ShortAnnouncements';

import '../styles/SubjectHomePage.css';

class SubjectHomePage extends React.Component {

	constructor() {
		super();

		this.state = {
			subjectName: '',
			subjectCode: ''
		};
	}

	componentDidMount() {
		let subIndex = history.location.search.slice(1, history.location.search.length).split('=')[1];

		database.ref('users/' + this.props.dbUserKey + '/userSubjects').on('value', (subjects) => {
			let currentIndex = 0;
			subjects.forEach((subject) => {
				if (currentIndex == subIndex) {
					database.ref('subjects/' + subject.val().dbSubjectKey).on('value', (currentSubject) => {
						this.setState({
							subjectName: currentSubject.val().subjectName,
							subjectCode: currentSubject.val().subjectCode
						});
					});
				}
				currentIndex++;
			});
			currentIndex = 0;
		});
	}

	render() {
		let subIndex = history.location.search.slice(1, history.location.search.length).split('=')[1];
		return (
			<div className="subject-home-page">
				<Header subjectCode={this.state.subjectCode} subjectName={this.state.subjectName} />
				<ShortAnnouncements subIndex={subIndex} dbUserKey={this.props.dbUserKey} />
			</div>
		);
	}
}

export default SubjectHomePage;