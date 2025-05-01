const authButton = document.getElementById('auth-btn');
const formTitle = document.getElementById('form-title');
const toggleLink = document.getElementById('toggle-link');
const assessmentResultDiv = document.getElementById('assessment-result');
const loginFormDiv = document.getElementById('login-form');
const nameInput = document.getElementById('name');
const roleSelect = document.getElementById('role');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const supportEmailInput = document.getElementById('support-email');
const supportMessageInput = document.getElementById('support-message');
const submitSupportButton = document.getElementById('submit-support');

let isSignup = false;

function toggleForm() {
    isSignup = !isSignup;
    formTitle.textContent = isSignup ? 'Signup' : 'Login';
    nameInput.style.display = isSignup ? 'block' : 'none';
    toggleLink.textContent = isSignup ? 'Already have an account? Login' : "Don't have an account? Signup";
 }

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    // Simulate successful login
    res.json({ message: 'Login successful!', userId: '123456' });
    });


authButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', { // ✅ Use backend API
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        alert(result.message);

        if (result.userId) {
            loginFormDiv.style.display = 'none';
            assessmentResultDiv.style.display = 'block';
            loadAssessmentGraph();
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('Login failed.');
    }


function loadAssessmentGraph() {
    fetch('/assessment/result')
        .then((response) => response.json())
        .then((data) => {
            const ctx = document.getElementById('assessment-graph').getContext('2d');
            const graphData = {
                labels: data.domainScores.map((domain) => domain.name),
                datasets: [{
                    label: 'Score by Domain',
                    data: data.domainScores.map((domain) => domain.score),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }],
            };
            new Chart(ctx, { type: 'line', data: graphData });
        })
        .catch((error) => console.error('Error:', error));
    }

submitSupportButton.addEventListener('click', () => {
    const supportEmail = supportEmailInput.value;
    const supportMessage = supportMessageInput.value;

    if (!supportEmail || !supportMessage) {
        alert('Please provide both email and message');
        return;
    }

    alert('Your message has been submitted successfully!');
    supportEmailInput.value = '';
    supportMessageInput.value = '';
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission default

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log('Sending login request...');

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log('Login Response:', result);

        alert(result.message);

        if (result.userId) {
            window.location.href = 'dashboard.html'; // Redirect after login
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('Login failed.');
    }
});
