import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { repoAPI } from "../../api";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [repoForm, setRepoForm] = useState({ name: "", description: "", visibility: true });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const { data } = await repoAPI.getUserRepos(userId);
        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error fetching user repositories:", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const { data } = await repoAPI.getAllRepos();
        setSuggestedRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching suggested repositories:", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  const handleCreateRepo = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await repoAPI.createRepo({
        owner: userId,
        name: repoForm.name,
        description: repoForm.description,
        visibility: repoForm.visibility,
      });
      setRepoForm({ name: "", description: "", visibility: true });
      setShowCreateModal(false);
      const { data } = await repoAPI.getUserRepos(userId);
      setRepositories(data.repositories || []);
    } catch (err) {
      console.error("Error creating repo:", err);
      alert("Failed to create repository");
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Repository</h2>
            <input
              type="text"
              placeholder="Repository name"
              value={repoForm.name}
              onChange={(e) => setRepoForm({ ...repoForm, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={repoForm.description}
              onChange={(e) => setRepoForm({ ...repoForm, description: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={repoForm.visibility}
                onChange={(e) => setRepoForm({ ...repoForm, visibility: e.target.checked })}
              />
              Public
            </label>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleCreateRepo}>Create</button>
              <button onClick={() => setShowCreateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id} className="repo-card">
                <h4>{repo.name}</h4>
                <p>{repo.description || "No description"}</p>
                <small>{repo.owner?.username || "Unknown"}</small>
              </div>
            );
          })}
        </aside>
        <main>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Your Repositories</h2>
            <button onClick={() => setShowCreateModal(true)}>+ New Repository</button>
          </div>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.length > 0 ? (
            searchResults.map((repo) => {
              return (
                <div key={repo._id} className="repo-card">
                  <h4>{repo.name}</h4>
                  <p>{repo.description || "No description"}</p>
                  <small>Visibility: {repo.visibility ? "Public" : "Private"}</small>
                </div>
              );
            })
          ) : (
            <p>No repositories found. Create one to get started!</p>
          )}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;