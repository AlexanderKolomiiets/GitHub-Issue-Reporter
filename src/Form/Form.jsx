import { Octokit } from '@octokit/rest';
import { useState } from 'react';
import 'bulma/css/bulma.min.css';

export const Form = () => {
  const token = 'ghp_token' // insert your token here to interact with Github API

  const octokit = new Octokit({
    auth: token
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => { 
    event.preventDefault();

    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: 'AlexanderKolomiiets', // insert an owner here
      repo: 'GitHub-Issue-Reporter', // insert your repo here
      title,
      body: description,
      labels: [
        'bug'
      ]
    });

    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input 
            className="input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea 
            className="textarea" 
            placeholder="Describe your issue"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      </div>
      <button className="button is-link">Submit</button>
    </form>
  );
};