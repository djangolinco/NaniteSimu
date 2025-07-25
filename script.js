

document.addEventListener('DOMContentLoaded', () => {
    const generateCampaignBtn = document.getElementById('generate-campaign-btn');
    const campaignBriefContainer = document.getElementById('campaign-brief-container');
    const generatedCampaignContainer = document.getElementById('generated-campaign-container');

    generateCampaignBtn.addEventListener('click', () => {
        campaignBriefContainer.style.display = 'none';
        generatedCampaignContainer.style.display = 'block';
    });

    // ... (rest of the script.js)
});

const initialAdData = [
    {
        "Ad set name": "AI Contest Early Adopters | T1 | 18-28 | 2025_07",
        "Ad set delivery": "archived",
        "Reach": 12174,
        "Cost per results": 6.85, // Adjusted to realistic range
        "Amount spent (USD)": 384.04,
        "Ends": "2025-07-18",
        "CPM (cost per 1,000 impressions) (USD)": 17.030599,
        "Link clicks": 286,
        "CTR (link click-through rate)": 0.015, // Adjusted to realistic percentage
        "CPC (cost per link click) (USD)": 1.342797
    },
    {
        "Ad set name": "Hackathon/Github Enthusiasts | T1 | 18-34 | 2025_07",
        "Ad set delivery": "recently_completed",
        "Reach": 16537,
        "Cost per results": 2.50, // Adjusted to realistic range
        "Amount spent (USD)": 278.17,
        "Ends": "2025-07-18",
        "CPM (cost per 1,000 impressions) (USD)": 11.02493,
        "Link clicks": 252,
        "CTR (link click-through rate)": 0.022, // Adjusted to realistic percentage
        "CPC (cost per link click) (USD)": 1.103849
    },
    {
        "Ad set name": "Indie Hackers & Startup Enthusiasts | T1 | 18-34 | 2025_07",
        "Ad set delivery": "recently_completed",
        "Reach": 14795,
        "Cost per results": 8.10, // Adjusted to realistic range
        "Amount spent (USD)": 272.15,
        "Ends": "2025-07-18",
        "CPM (cost per 1,000 impressions) (USD)": 11.583316,
        "Link clicks": 216,
        "CTR (link click-through rate)": 0.018, // Adjusted to realistic percentage
        "CPC (cost per link click) (USD)": 1.259954
    },
    {
        "Ad set name": "AI Builders & Hackathon Competitors | T1 | 18-34 | 2025_07 – Copy",
        "Ad set delivery": "recently_completed",
        "Reach": 19196,
        "Cost per results": 7.20, // Adjusted to realistic range
        "Amount spent (USD)": 303.96,
        "Ends": "2025-07-18",
        "CPM (cost per 1,000 impressions) (USD)": 10.755839,
        "Link clicks": 290,
        "CTR (link click-through rate)": 0.025, // Adjusted to realistic percentage
        "CPC (cost per link click) (USD)": 1.048138
    },
    {
        "Ad set name": "Students & Recent Grads with AI & Career Interest | T1 | 18-28 | 2025_07",
        "Ad set delivery": "active", // Changed to active
        "Reach": 3131,
        "Cost per results": 2.90, // Adjusted to realistic range for good performance
        "Amount spent (USD)": 65.65,
        "Ends": "2025-07-18",
        "CPM (cost per 1,000 impressions) (USD)": 18.358501,
        "Link clicks": 32,
        "CTR (link click-through rate)": 0.012, // Adjusted to realistic percentage
        "CPC (cost per link click) (USD)": 2.051563
    }
];

let adData = JSON.parse(JSON.stringify(initialAdData)); // Deep copy for reset functionality

const adCreatives = [
    "1-1Man-typing.png",
    "CanYourAgentWin-hori_.png",
    "CanYourAgentWin.png",
    "canyouragentwin1-1.png",
    "horizontal-Man-typing.png",
    "InstaAd.png",
    "InstaAdVertical.png",
    "logo-nanite.png",
    "Man-typing.png",
    "prove-you-the-best-1-1.png",
    "prove-you-the-best-9-16.png",
    "prove-you-the-best-hor.png",
    "TESTYOURAGENT-1-1.png",
    "TESTYOURAGENT-16-9.png",
    "TESTYOURAGENT-Hori.png"
];

document.addEventListener('DOMContentLoaded', () => {
    const adsTableBody = document.querySelector('#ads-table tbody');
    const adCreativeSelect = document.getElementById('ad-creative');
    const createAdForm = document.getElementById('create-ad-form');
    const aiSuggestNewCampaignBtn = document.getElementById('ai-suggest-new-campaign');
    const newCampaignSuggestionDiv = document.getElementById('new-campaign-suggestion');

    const aiAudienceRefinementBtn = document.getElementById('ai-audience-refinement');
    const aiCreativeOptimizationBtn = document.getElementById('ai-creative-optimization');
    const campaignOptimizationSuggestionDiv = document.getElementById('campaign-optimization-suggestion');

    const runAnalysisBtn = document.getElementById('run-analysis-btn');
    const analysisResultsDiv = document.getElementById('analysis-results');
    const runTrendsAnalysisBtn = document.getElementById('run-trends-analysis-btn');
    const trendsAnalysisResultsDiv = document.getElementById('trends-analysis-results');
    const resetSimulatorBtn = document.getElementById('reset-simulator');

    // AI Suggestion Logic for existing ad sets
    const getAISuggestion = (ad) => {
        const cpr = ad['Cost per results'];
        const ctr = ad['CTR (link click-through rate)'];

        if (cpr > 10 && ctr < 0.01) { // High CPR and low CTR
            return {
                action: 'killAdSet',
                rationale: `This ad set has a high CPR ($${cpr.toFixed(2)}) and low CTR (${(ctr * 100).toFixed(2)}%). AI recommends killing it to prevent further wasted spend.`,
                effect: () => {
                    ad['Ad set delivery'] = 'processing'; // Change to processing
                }
            };
        } else if (cpr > 5 && ctr >= 0.01) { // High CPR but decent CTR
            return {
                action: 'optimizeCreative',
                rationale: `This ad set has a high CPR ($${cpr.toFixed(2)}) but a reasonable CTR (${(ctr * 100).toFixed(2)}%). AI suggests optimizing the creative to improve conversion rate and reduce CPR to $0.80.`,
                effect: () => {
                    ad['Cost per results'] = 0.80;
                    ad['Ad set delivery'] = 'processing'; // Change to processing
                }
            };
        } else if (cpr <= 5 && ctr < 0.01) { // Low CPR but low CTR
            return {
                action: 'adjustAudience',
                rationale: `This ad set has a good CPR ($${cpr.toFixed(2)}) but a low CTR (${(ctr * 100).toFixed(2)}%). AI suggests adjusting the audience to reach more relevant users and increase engagement.`,
                effect: () => {
                    ad['CTR (link click-through rate)'] = (ctr * 1.5); // Simulate CTR increase
                    ad['Ad set delivery'] = 'processing'; // Change to processing
                }
            };
        } else {
            return {
                action: 'monitor',
                rationale: `This ad set is performing well (CPR: $${cpr.toFixed(2)}, CTR: ${(ctr * 100).toFixed(2)}%). AI recommends continued monitoring.`,
                effect: () => {
                    // No change, just monitoring
                }
            };
        }
    };

    // Function to map internal status to display status
    const getDisplayStatus = (internalStatus) => {
        if (internalStatus === 'archived' || internalStatus === 'recently_completed' || internalStatus === 'active') {
            return 'Active';
        } else if (internalStatus === 'inactive') {
            return 'Inactive';
        } else if (internalStatus === 'killed') {
            return 'Killed';
        } else if (internalStatus === 'processing') { // New status
            return 'Processing';
        }
        return internalStatus; // Fallback
    };

    // Function to populate the table
    const populateTable = () => {
        adsTableBody.innerHTML = ''; // Clear existing rows
        adData.forEach((ad, index) => {
            const row = adsTableBody.insertRow();
            row.insertCell().textContent = ad['Ad set name'];
            row.insertCell().textContent = getDisplayStatus(ad['Ad set delivery']);
            row.insertCell().textContent = ad['Reach'];
            row.insertCell().textContent = ad['Cost per results'].toFixed(2);
            row.insertCell().textContent = ad['Amount spent (USD)'].toFixed(2);
            row.insertCell().textContent = ad['Ends'];
            row.insertCell().textContent = ad['CPM (cost per 1,000 impressions) (USD)'].toFixed(2);
            row.insertCell().textContent = ad['Link clicks'];
            row.insertCell().textContent = (ad['CTR (link click-through rate)'] * 100).toFixed(2) + '%'; // Format as percentage
            row.insertCell().textContent = ad['CPC (cost per link click) (USD)'].toFixed(2);

            const actionsCell = row.insertCell();
            actionsCell.classList.add('ai-suggestion-cell'); // Use the new class for styling

            const aiSuggestion = getAISuggestion(ad);

            const rationaleDiv = document.createElement('div');
            rationaleDiv.textContent = aiSuggestion.rationale;
            actionsCell.appendChild(rationaleDiv);

            // Add Accept/Reject buttons only if there's an actionable suggestion
            if (aiSuggestion.action !== 'monitor') {
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('ai-suggestion-buttons');

                const approveButton = document.createElement('button');
                approveButton.textContent = 'Accept';
                approveButton.classList.add('md-button', 'md-button--table', 'md-button--table-accept');
                approveButton.onclick = () => {
                    aiSuggestion.effect();
                    populateTable();
                };
                buttonContainer.appendChild(approveButton);

                const rejectButton = document.createElement('button');
                rejectButton.textContent = 'Reject';
                rejectButton.classList.add('md-button', 'md-button--table', 'md-button--table-reject');
                rejectButton.onclick = () => {
                    // Maybe add a visual indicator that it was rejected
                    populateTable(); 
                };
                buttonContainer.appendChild(rejectButton);
                actionsCell.appendChild(buttonContainer);
            }
        });
    };

    populateTable(); // Initial population

    // Populate Ad Creative Dropdown
    // Clear existing options first
    adCreativeSelect.innerHTML = '';
    // Add the new options
    const uploadOption = document.createElement('option');
    uploadOption.value = 'upload';
    uploadOption.textContent = 'Upload Image/Creative';
    adCreativeSelect.appendChild(uploadOption);

    const generateOption = document.createElement('option');
    generateOption.value = 'generate';
    generateOption.textContent = 'Generate (AI)';
    adCreativeSelect.appendChild(generateOption);

    // Add existing creatives as options (optional, depending on desired flow)
    adCreatives.forEach(creative => {
        const option = document.createElement('option');
        option.value = creative;
        option.textContent = creative;
        adCreativeSelect.appendChild(option);
    });

    // AI Suggestion for New Campaign
    aiSuggestNewCampaignBtn.addEventListener('click', () => {
        // Simple logic: find the best performing ad set by CPR
        const bestPerformingAd = adData.reduce((prev, current) => {
            return (prev['Cost per results'] < current['Cost per results']) ? prev : current;
        });

        const suggestion = `Based on current campaign performance, we recommend a new campaign targeting similar audiences to "${bestPerformingAd['Ad set name']}".\n\nRecommended Audience: Similar to "${bestPerformingAd['Ad set name'].split('|')[0].trim()}"\nRecommended Creative Type: Optimize for low CPR (e.g., high-converting static image)\nRecommended Daily Budget: $50 (based on successful campaigns)`;

        newCampaignSuggestionDiv.innerHTML = `
            <p>${suggestion.replace(/\n/g, '<br>')}</p>
            <button id="apply-suggestion">Apply Recommendation</button>
        `;

        document.getElementById('apply-suggestion').onclick = () => {
            document.getElementById('audience').value = "AI Enthusiasts"; // Mock applying
            document.getElementById('ad-creative').value = "generate"; // Mock applying
            document.getElementById('budget').value = 50; // Mock applying
            alert('AI recommendations applied to the form!');
            newCampaignSuggestionDiv.innerHTML = ''; // Clear suggestion
        };
    });

    // Campaign Optimization Actions
    // Removed aiBudgetAllocationBtn, aiPauseStartBtn, aiBidStrategyBtn

    aiAudienceRefinementBtn.addEventListener('click', () => {
        const underperformingAudience = adData.find(ad => ad['Ad set name'].includes('Students') && ad['Cost per results'] > 10);
        const topPerformingAudience = adData.find(ad => ad['Ad set name'].includes('Hackathon') && ad['Cost per results'] < 3);

        let suggestionText = '';
        if (underperformingAudience) {
            suggestionText += `AI suggests narrowing the audience for "${underperformingAudience['Ad set name']}" (High CPR: $${underperformingAudience['Cost per results'].toFixed(2)}) to focus on users aged 25-35 interested in AI research. This will improve targeting efficiency.`;
        }
        if (topPerformingAudience) {
            if (suggestionText !== '') suggestionText += '\n\n';
            suggestionText += `AI suggests expanding lookalike audiences based on "${topPerformingAudience['Ad set name']}" (Good CPR: $${topPerformingAudience['Cost per results'].toFixed(2)}) to find similar high-value users with interests in competitive programming. This will help scale successful campaigns.`;
        }

        campaignOptimizationSuggestionDiv.innerHTML = `
            <p>${suggestionText.replace(/\n/g, '<br>')}</p>
            <button class="accept" id="apply-audience-optimization">Accept</button>
            <button class="reject" id="reject-audience-optimization">Reject</button>
        `;

        document.getElementById('apply-audience-optimization').onclick = () => {
            if (underperformingAudience) underperformingAudience['CTR (link click-through rate)'] *= 1.1; // Simulate improvement
            if (topPerformingAudience) topPerformingAudience['CTR (link click-through rate)'] *= 1.05; // Simulate improvement
            populateTable();
            alert('Audience refinement applied.');
            campaignOptimizationSuggestionDiv.innerHTML = '';
        };
        document.getElementById('reject-audience-optimization').onclick = () => {
            alert('Audience refinement rejected.');
            campaignOptimizationSuggestionDiv.innerHTML = '';
        };
    });

    aiCreativeOptimizationBtn.addEventListener('click', () => {
        const lowCTRAd = adData.find(ad => ad['CTR (link click-through rate)'] < 0.015 && ad['Ad set delivery'] === 'Active');
        const highCTRAd = adData.find(ad => ad['CTR (link click-through rate)'] > 0.02 && ad['Ad set delivery'] === 'Active');

        let suggestionText = '';
        let creativeDisplay = '';
        let adCopyDisplay = ''; // New variable for ad copy

        // Mock creatives for demonstration
        const recommendedCreative1 = "TESTYOURAGENT-1-1.png";
        const recommendedCreative2 = "TESTYOURAGENT-1-1.png"; // Using the same image as requested
        const adCopySuggestion1 = "Headline: Test Your AI Agent. Description: Compete against the best in the Nanite Olympics!";
        const adCopySuggestion2 = "Headline: Prove Your Skills. Description: Join the waitlist for the ultimate AI agent competition.";

        if (lowCTRAd) {
            suggestionText += `AI suggests A/B testing new creatives for "${lowCTRAd['Ad set name']}" (Low CTR: ${(lowCTRAd['CTR (link click-through rate)'] * 100).toFixed(2)}%). This could significantly improve engagement.`;
            creativeDisplay += `<img src="/NaniteSimu/.gemini/Nanite-Ad-Creatives/${recommendedCreative1}" alt="Recommended Creative 1" style="width: 150px; height: auto; margin-top: 10px; margin-right: 10px;">`;
            creativeDisplay += `<img src="/NaniteSimu/.gemini/Nanite-Ad-Creatives/${recommendedCreative2}" alt="Recommended Creative 2" style="width: 150px; height: auto; margin-top: 10px;">`;
            adCopyDisplay += `
                <p><strong>Suggested Ad Copy 1:</strong><br>${adCopySuggestion1}</p>
                <p><strong>Suggested Ad Copy 2:</strong><br>${adCopySuggestion2}</p>
            `;
        }
        if (highCTRAd) {
            if (suggestionText !== '') suggestionText += '<br><br>'; // Use <br> for HTML
            suggestionText += `AI recommends generating similar creative variations based on the success of "${highCTRAd['Ad set name']}" (High CTR: ${(highCTRAd['CTR (link click-through rate)'] * 100).toFixed(2)}%).`;
        }

        campaignOptimizationSuggestionDiv.innerHTML = `
            <p>${suggestionText}</p>
            ${creativeDisplay}
            ${adCopyDisplay}
            <div class="ai-suggestion-buttons">
                <button class="accept" id="apply-creative-optimization">Accept</button>
                <button class="reject" id="reject-creative-optimization">Reject</button>
            </div>
        `;

        document.getElementById('apply-creative-optimization').onclick = () => {
            if (lowCTRAd) lowCTRAd['CTR (link click-through rate)'] *= 1.15; // Significant improvement
            if (highCTRAd) highCTRAd['CTR (link click-through rate)'] *= 1.05; // Slight improvement
            populateTable();
            alert('Creative optimization applied.');
            campaignOptimizationSuggestionDiv.innerHTML = '';
        };
        document.getElementById('reject-creative-optimization').onclick = () => {
            alert('Creative optimization rejected.');
            campaignOptimizationSuggestionDiv.innerHTML = '';
        };
    });

    // Creative Studio Functionality
    const aiAdImage = document.getElementById('ai-ad-image');
    const primaryText = document.getElementById('primary-text');
    const headline = document.getElementById('headline');
    const cta = document.getElementById('cta');
    const adUrl = document.getElementById('ad-url');
    const generateAiCopyBtn = document.getElementById('generate-ai-copy');

    // Set initial image and content
    aiAdImage.src = '.gemini/Nanite-Ad-Creatives/TESTYOURAGENT-1-1.png';
    primaryText.value = "Unleash your AI's potential! Compete in the Nanite Olympics and prove you're the best. Join a community of elite AI builders and win big. Sign up for early access now!";
    headline.value = "Test Your AI Agent. Win Big.";
    cta.value = "Join the Waitlist";
    adUrl.value = "https://nanite.org/?utm_source=x&utm_medium=paid_social&utm_campaign=waitlist_leadgen_july&utm_content=carousel_cheatcode";

    generateAiCopyBtn.addEventListener('click', () => {
        // Simulate AI generating new copy
        const newPrimaryTexts = [
            "Ready to dominate the AI world? The Nanite Olympics is calling! Showcase your agent-building skills, connect with top talent, and earn recognition. Don't miss out – secure your spot today!",
            "Your AI agent, your legacy. Enter the Nanite Olympics, the ultimate proving ground for AI innovators. Build, compete, and conquer. Early access is limited – sign up now!",
            "Transform your AI ideas into reality. The Nanite Olympics offers a unique platform to test, refine, and celebrate your AI creations. Join our exclusive community and start your journey to victory!"
        ];
        const newHeadlines = [
            "Prove Your AI Prowess.",
            "The Future of AI Competition.",
            "Build. Compete. Conquer."
        ];
        const newCtas = [
            "Sign Up Now",
            "Get Early Access",
            "Learn More"
        ];

        primaryText.value = newPrimaryTexts[Math.floor(Math.random() * newPrimaryTexts.length)];
        headline.value = newHeadlines[Math.floor(Math.random() * newHeadlines.length)];
        cta.value = newCtas[Math.floor(Math.random() * newCtas.length)];
        alert('New AI-generated copy has been loaded!');
    });
});
