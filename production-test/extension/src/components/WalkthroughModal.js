// WalkthroughModal.js - Sandbox walkthrough modal controller

class WalkthroughModal {
  constructor() {
    this.currentStep = 0;
    this.modal = null;
    this.content = null;
    this.stepIndicator = null;
    this.backBtn = null;
    this.nextBtn = null;
    this.onComplete = null;

    this.steps = [
      {
        title: '🧪 Welcome to SheetLink Sandbox',
        content: `
          <div class="step-intro">
            <span class="walkthrough-icon">🧪</span>
            <h2>Welcome to SheetLink Sandbox</h2>
            <p>You're about to connect to Plaid's sandbox, a safe demo with fake data only.</p>
            <p>This walkthrough will guide you through the connection process step by step.</p>
          </div>
        `,
        nextText: 'Continue'
      },
      {
        title: 'Step 1 / 3 - Select Any Institution',
        content: `
          <h2>Step 1: Select Any Institution</h2>
          <p>When Plaid opens, select any institution (for example, <strong>Chase</strong> or <strong>Bank of America</strong>).</p>
          <p style="font-size: 13px; color: #6b7280; margin-top: 12px;">You're in Sandbox mode. All data is simulated.</p>
        `,
        nextText: 'Continue'
      },
      {
        title: 'Step 2 / 3 - Enter Test Credentials',
        content: `
          <h2>Step 2: Enter Test Credentials</h2>
          <p>When prompted for credentials, use:</p>
          <div class="credentials-box">
            <h3>🗝️ Test Credentials</h3>
            <ul>
              <li><strong>Username:</strong> user_good</li>
              <li><strong>Password:</strong> pass_good</li>
              <li><strong>Phone:</strong> (415) 555-0123</li>
              <li><strong>Code:</strong> 123456</li>
            </ul>
          </div>
          <p style="font-size: 13px; color: #6b7280; margin-top: 12px;">These are Plaid's public sandbox credentials, safe and fake.</p>
        `,
        nextText: 'Continue'
      },
      {
        title: 'Step 3 / 3 - Sync Sample Data',
        content: `
          <h2>Step 3: Sync Sample Data</h2>
          <p>Once connected, click <strong>"Sync Sample Data"</strong> to populate your Sheet.</p>
          <p style="margin-top: 16px; font-size: 13px; color: #6b7280;">You can reset anytime from the options page.</p>
          <p style="margin-top: 16px; font-size: 13px; color: #6b7280;">Ready to connect? Click below to open Plaid Link.</p>
        `,
        nextText: 'Open Plaid Link'
      }
    ];
  }

  async init() {
    // Load HTML template
    const response = await fetch(chrome.runtime.getURL('src/components/WalkthroughModal.html'));
    const html = await response.text();

    // Inject into document
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstElementChild);

    // Get elements
    this.modal = document.getElementById('walkthroughModal');
    this.content = document.getElementById('walkthroughContent');
    this.stepIndicator = document.getElementById('walkthroughStep');
    this.backBtn = document.getElementById('walkthroughBack');
    this.nextBtn = document.getElementById('walkthroughNext');

    // Add event listeners
    this.backBtn.addEventListener('click', () => this.previousStep());
    this.nextBtn.addEventListener('click', () => this.nextStep());

    // Click overlay to close (optional)
    this.modal.querySelector('.walkthrough-overlay').addEventListener('click', () => this.close());
  }

  show(onComplete) {
    this.onComplete = onComplete;
    this.currentStep = 0;
    this.modal.classList.remove('hidden');
    this.renderStep();
  }

  close() {
    this.modal.classList.add('hidden');
  }

  renderStep() {
    const step = this.steps[this.currentStep];

    // Update content
    this.content.innerHTML = step.content;

    // Update step indicator (hide for intro)
    if (this.currentStep === 0) {
      this.stepIndicator.textContent = '';
    } else {
      this.stepIndicator.textContent = step.title.match(/Step \d \/ \d/) ? step.title.match(/Step \d \/ \d/)[0] : '';
    }

    // Update buttons
    this.backBtn.disabled = this.currentStep === 0;
    this.nextBtn.textContent = step.nextText;
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  }

  async nextStep() {
    // Last step - complete
    if (this.currentStep === this.steps.length - 1) {
      // Mark walkthrough as completed
      await chrome.storage.local.set({ walkthroughCompleted: true });

      this.close();

      // Call completion callback (triggers Plaid Link)
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    // Next step
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderStep();
    }
  }

  // Reset walkthrough (for replay)
  async reset() {
    await chrome.storage.local.set({ walkthroughCompleted: false });
    this.currentStep = 0;
  }

  // Check if user has completed walkthrough
  static async hasCompleted() {
    const data = await chrome.storage.local.get(['walkthroughCompleted']);
    return data.walkthroughCompleted === true;
  }
}

// Export for use in popup.js and options.js
window.WalkthroughModal = WalkthroughModal;
