import React, { useState } from 'react'

const HARDCODED_EMAIL = 'user@example.com'

export default function App() {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [view, setView] = useState('home') // 'home' | 'login' | 'others'
	const [email, setEmail] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		const isMatch = email.trim().toLowerCase() === HARDCODED_EMAIL
		if (isMatch) {
			alert('Email verified successfully!')
		} else {
			alert('Invalid email. Please try again.')
		}
	}

	function switchView(next) {
		setView(next)
		setDrawerOpen(false)
	}

	return (
		<div className="app-shell">
			<header className="topbar">
				<button
					className={`hamburger ${drawerOpen ? 'active' : ''}`}
					aria-label="Open navigation"
					onClick={() => setDrawerOpen((v) => !v)}
				>
					<div className="lines"><span></span></div>
				</button>
				<div className="brand">AURORA LABS</div>
			</header>

			{/* Drawer */}
			<div className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}></div>
			<aside className={`drawer ${drawerOpen ? 'open' : ''}`}>
				<h3>Navigation</h3>
				<div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => switchView('home')}>Home</div>
				<div className={`nav-item ${view === 'login' ? 'active' : ''}`} onClick={() => switchView('login')}>Login</div>
				<div className={`nav-item ${view === 'others' ? 'active' : ''}`} onClick={() => switchView('others')}>Others</div>
			</aside>

			<main className="content">
				{view === 'home' && (
					<section className="hero">
						<div>
							<h1 className="hero-title">Engineering Tomorrow's Interfaces</h1>
							<p className="hero-sub">We are building adaptive, resilient systems for the post-cloud era. Explore human-grade experiences with machine-scale reliability.</p>
							<div className="cta-row">
								<button className="btn-primary" onClick={() => switchView('login')}>Access Console</button>
								<button className="btn-ghost" onClick={() => switchView('others')}>Learn More</button>
							</div>
						</div>
					</section>
				)}

				{view === 'login' && (
					<section style={{ display: 'grid', placeItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
						<div className="card">
							<h2 style={{ margin: 0, marginBottom: '6px' }}>Welcome back</h2>
							<p style={{ marginTop: 0, color: 'var(--muted)' }}>Sign in via email to continue</p>
							<form onSubmit={handleSubmit}>
								<label htmlFor="email" className="label">Email</label>
								<input
									id="email"
									type="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="input"
								/>
								<button type="submit" className="btn-primary" style={{ width: '100%' }}>
									Submit
								</button>
							</form>
							<p style={{ marginTop: '12px', color: 'var(--muted)', fontSize: '12px' }}>Try: <code>{HARDCODED_EMAIL}</code></p>
						</div>
					</section>
				)}

				{view === 'others' && (
					<section className="hero">
						<div>
							<h1 className="hero-title">Working</h1>
							<p className="hero-sub">This space is under active development. Check back soon.</p>
						</div>
					</section>
				)}
			</main>
		</div>
	)
}


