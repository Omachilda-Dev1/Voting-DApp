import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import VotingSystemABI from './VotingSystemABI.json';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProposal, setNewProposal] = useState({ description: '', duration: '' });
  const [darkMode, setDarkMode] = useState(true);

  const contractAddress = "0xfE8B10574f86647267b565FbFd75ba59aC4eAeD6";

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contract) {
      loadProposals();
      checkAdmin();
      
      const interval = setInterval(loadProposals, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          // User is already connected, set up without requesting permission
          await setupProvider(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const setupProvider = async (accountAddress) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Connected to network:", network);
      console.log("Chain ID:", network.chainId);
      
      if (network.chainId !== 11155111n) {
        alert('Please switch to Sepolia network (Chain ID: 11155111)');
        return;
      }

      const signer = await provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress, VotingSystemABI, signer);
      
      // Test if contract exists
      try {
        const code = await provider.getCode(contractAddress);
        console.log("Contract code length:", code.length);
        if (code === '0x') {
          alert('Contract not found at this address. Please redeploy the contract.');
          return;
        }
      } catch (err) {
        console.error("Error checking contract:", err);
      }
      
      setAccount(accountAddress);
      setContract(votingContract);

      // Set up account change listener only once
      if (!window.ethereum._accountsChangedListenerSet) {
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            window.location.reload();
          } else {
            setAccount(null);
            setContract(null);
          }
        });
        window.ethereum._accountsChangedListenerSet = true;
      }
    } catch (error) {
      console.error("Error setting up provider:", error);
      alert("Failed to connect: " + error.message);
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await setupProvider(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // More user-friendly error messages
      if (error.code === -32002) {
        alert("Connection request already pending. Please check MetaMask and approve the connection request.");
      } else if (error.code === 4001) {
        alert("Connection rejected. Please approve the connection in MetaMask to use this app.");
      } else {
        alert("Failed to connect wallet: " + error.message);
      }
    }
  };

  const checkAdmin = async () => {
    try {
      console.log("Checking admin status...");
      console.log("Contract:", contract);
      console.log("Account:", account);
      
      const adminAddress = await contract.admin();
      console.log("Admin address from contract:", adminAddress);
      console.log("Current account:", account);
      
      const isAdminUser = adminAddress.toLowerCase() === account.toLowerCase();
      console.log("Is admin?", isAdminUser);
      
      setIsAdmin(isAdminUser);
    } catch (error) {
      console.error("Error checking admin:", error);
    }
  };

  const loadProposals = async () => {
    try {
      const allProposals = await contract.getAllProposals();
      const proposalsData = allProposals[0].map((id, index) => ({
        id: Number(id),
        description: allProposals[1][index],
        deadline: Number(allProposals[2][index]),
        voteCount: Number(allProposals[3][index]),
        isActive: allProposals[4][index]
      }));
      setProposals(proposalsData);
    } catch (error) {
      console.error("Error loading proposals:", error);
    }
  };

  const createProposal = async (e) => {
    e.preventDefault();
    if (!newProposal.description || !newProposal.duration) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.createProposal(newProposal.description, newProposal.duration);
      await tx.wait();
      alert("Proposal created successfully!");
      setNewProposal({ description: '', duration: '' });
      loadProposals();
    } catch (error) {
      console.error("Error creating proposal:", error);
      alert("Failed to create proposal: " + error.message);
    }
    setLoading(false);
  };

  const vote = async (proposalId) => {
    setLoading(true);
    try {
      const hasVoted = await contract.hasVoted(proposalId, account);
      if (hasVoted) {
        alert("You have already voted on this proposal");
        setLoading(false);
        return;
      }

      const tx = await contract.vote(proposalId);
      await tx.wait();
      alert("Vote submitted successfully!");
      loadProposals();
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to vote: " + error.message);
    }
    setLoading(false);
  };

  const formatDeadline = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getTimeRemaining = (deadline) => {
    const now = Math.floor(Date.now() / 1000);
    const remaining = deadline - now;
    
    if (remaining <= 0) return "Ended";
    
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="header-left">
          <svg className="logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
          </svg>
          <h1 className="app-title">Voting System</h1>
        </div>
        
        <div className="header-right">
          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle" title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          
          {account ? (
            <div className="wallet-info">
              <div className="status-indicator">
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" fill="#10b981"/>
                </svg>
              </div>
              <span className="wallet-address">{account.substring(0, 6)}...{account.substring(38)}</span>
              {isAdmin && <span className="admin-badge">ADMIN</span>}
            </div>
          ) : (
            <button onClick={connectWallet} className="connect-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 10l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {!account ? (
          <div className="connect-prompt">
            <svg className="connect-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Connect Your Wallet</h2>
            <p>Connect your wallet to view and participate in voting proposals</p>
            <button onClick={connectWallet} className="connect-btn-large">
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            {isAdmin && (
              <section className="admin-section">
                <div className="section-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h2>Create New Proposal</h2>
                </div>
                <form onSubmit={createProposal} className="proposal-form">
                  <div className="form-group">
                    <label>Proposal Description</label>
                    <input
                      type="text"
                      placeholder="Enter proposal description"
                      value={newProposal.description}
                      onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      placeholder="Enter duration in minutes"
                      value={newProposal.duration}
                      onChange={(e) => setNewProposal({...newProposal, duration: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? (
                      <>
                        <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                          <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Create Proposal
                      </>
                    )}
                  </button>
                </form>
              </section>
            )}

            <section className="proposals-section">
              <div className="section-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
                </svg>
                <h2>Proposals</h2>
                <span className="proposal-count">{proposals.length} Total</span>
              </div>
              
              {proposals.length === 0 ? (
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor" opacity="0.3"/>
                  </svg>
                  <p>No proposals yet</p>
                  <span>Create the first proposal to get started</span>
                </div>
              ) : (
                <div className="proposals-grid">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className={`proposal-card ${!proposal.isActive ? 'ended' : ''}`}>
                      <div className="proposal-header">
                        <div className="proposal-id">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" fill="currentColor"/>
                          </svg>
                          Proposal #{proposal.id}
                        </div>
                        <span className={`status-badge ${proposal.isActive ? 'active' : 'ended'}`}>
                          {proposal.isActive ? 'ACTIVE' : 'ENDED'}
                        </span>
                      </div>
                      
                      <p className="proposal-description">{proposal.description}</p>
                      
                      <div className="proposal-stats">
                        <div className="stat">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" fill="currentColor"/>
                          </svg>
                          <div className="stat-content">
                            <span className="stat-label">Total Votes</span>
                            <span className="stat-value">{proposal.voteCount}</span>
                          </div>
                        </div>
                        <div className="stat">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" fill="currentColor"/>
                          </svg>
                          <div className="stat-content">
                            <span className="stat-label">Deadline</span>
                            <span className="stat-value">{formatDeadline(proposal.deadline)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="time-remaining">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                        </svg>
                        {getTimeRemaining(proposal.deadline)}
                      </div>
                      
                      {proposal.isActive && (
                        <button
                          onClick={() => vote(proposal.id)}
                          disabled={loading}
                          className="vote-btn"
                        >
                          {loading ? (
                            <>
                              <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                              </svg>
                              Voting...
                            </>
                          ) : (
                            <>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
                              </svg>
                              Cast Vote
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
