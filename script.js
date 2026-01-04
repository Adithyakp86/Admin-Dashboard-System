// Admin Dashboard JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
        
        // Update header position
        const header = document.querySelector('.header');
        if (sidebar.classList.contains('collapsed')) {
            header.style.left = '70px';
        } else {
            header.style.left = '260px';
        }
    });

    // Initialize charts
    initCharts();

    // Add active class to clicked sidebar items
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
        });
    });

    // Notification badge functionality
    const notificationIcon = document.querySelector('.notification-icon');
    notificationIcon.addEventListener('click', function() {
        // Clear notifications
        const badge = this.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
    });

    // Simulate dynamic data updates
    setInterval(updateStats, 30000); // Update stats every 30 seconds
});

function initCharts() {
    // Get the canvas element and set its dimensions
    const canvas = document.getElementById('revenueChart');
    if (canvas) {
        // Set canvas dimensions to match its display size
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Define chart data
        const data = [85, 70, 80, 60, 50, 65, 45]; // Representing percentage values
        const maxValue = Math.max(...data);
        
        // Calculate coordinates for the line chart
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        const getX = (index) => padding + (index * chartWidth) / (data.length - 1);
        const getY = (value) => height - padding - (value / maxValue) * chartHeight;
        
        // Draw grid lines
        ctx.strokeStyle = '#eaeaea';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i * chartHeight) / 5;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i < data.length; i++) {
            const x = getX(i);
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }
        
        // Draw the line chart
        ctx.beginPath();
        ctx.moveTo(getX(0), getY(data[0]));
        
        for (let i = 1; i < data.length; i++) {
            ctx.lineTo(getX(i), getY(data[i]));
        }
        
        // Style the line
        ctx.strokeStyle = '#4facfe';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw data points
        for (let i = 0; i < data.length; i++) {
            ctx.beginPath();
            ctx.arc(getX(i), getY(data[i]), 5, 0, Math.PI * 2);
            ctx.fillStyle = '#667eea';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        // Draw labels on x-axis
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], getX(i), height - 10);
        }
        
        // Draw labels on y-axis
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const value = Math.round((maxValue / 5) * (5 - i));
            ctx.fillText(value, padding - 10, padding + (i * chartHeight) / 5 + 5);
        }
    }
}

function updateStats() {
    // Simulate updating statistics with new data
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length > 0) {
        // Update user count
        const userStat = statCards[0].querySelector('h3');
        const currentUserCount = parseInt(userStat.textContent.replace(/,/g, ''));
        const newUserCount = currentUserCount + Math.floor(Math.random() * 10);
        userStat.textContent = newUserCount.toLocaleString();
        
        // Update order count
        const orderStat = statCards[1].querySelector('h3');
        const currentOrderCount = parseInt(orderStat.textContent.replace(/,/g, ''));
        const newOrderCount = currentOrderCount + Math.floor(Math.random() * 5);
        orderStat.textContent = newOrderCount.toLocaleString();
        
        // Update revenue
        const revenueStat = statCards[2].querySelector('h3');
        const currentRevenue = parseFloat(revenueStat.textContent.replace('$', '').replace(/,/g, ''));
        const newRevenue = currentRevenue + (Math.random() * 1000);
        revenueStat.textContent = '$' + newRevenue.toLocaleString(undefined, {maximumFractionDigits: 0});
        
        // Update growth rate
        const growthStat = statCards[3].querySelector('h3');
        const currentGrowth = parseFloat(growthStat.textContent.replace('+', '').replace('%', ''));
        const newGrowth = currentGrowth + (Math.random() * 2 - 1); // Random change between -1 and +1
        growthStat.textContent = '+' + newGrowth.toFixed(1) + '%';
    }
}

// Utility function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to handle responsive behavior
function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const header = document.querySelector('.header');
    
    if (window.innerWidth <= 992) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        // On mobile, header should not have fixed left position
        if (window.innerWidth <= 768) {
            header.style.left = '0';
        } else {
            header.style.left = '70px';
        }
    } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
        // Only set left position if not on mobile
        if (window.innerWidth > 768) {
            header.style.left = '260px';
        }
    }
}

// Add resize event listener
window.addEventListener('resize', function() {
    handleResize();
    initCharts(); // Reinitialize charts on resize
});

// Initialize on load
window.addEventListener('load', function() {
    handleResize();
    initCharts();
    
    // Set initial header position after DOM is fully loaded
    setTimeout(() => {
        const header = document.querySelector('.header');
        const sidebar = document.querySelector('.sidebar');
        
        if (window.innerWidth > 768) {
            if (sidebar.classList.contains('collapsed')) {
                header.style.left = '70px';
            } else {
                header.style.left = '260px';
            }
        } else {
            header.style.left = '0';
        }
    }, 100); // Small delay to ensure layout is complete
});

// Add functionality to table rows for selection
document.querySelectorAll('.orders-table tbody tr').forEach(row => {
    row.addEventListener('click', function() {
        // Remove selected class from all rows
        document.querySelectorAll('.orders-table tbody tr').forEach(r => {
            r.classList.remove('selected');
        });
        
        // Add selected class to clicked row
        this.classList.add('selected');
    });
});

// Add animation to stat cards on hover
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add modal functionality for user profile dropdown
const userProfile = document.querySelector('.user-profile');
const dropdownMenu = document.createElement('div');
dropdownMenu.className = 'dropdown-menu';
dropdownMenu.innerHTML = `
    <div class="dropdown-item">
        <i class="fas fa-user"></i>
        <span>Profile</span>
    </div>
    <div class="dropdown-item">
        <i class="fas fa-cog"></i>
        <span>Settings</span>
    </div>
    <div class="dropdown-item">
        <i class="fas fa-bell"></i>
        <span>Notifications</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
    </div>
`;
userProfile.appendChild(dropdownMenu);

userProfile.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function() {
    dropdownMenu.classList.remove('show');
});

// Add search functionality
const searchInput = document.createElement('div');
searchInput.className = 'search-container';
searchInput.innerHTML = `
    <input type="text" class="search-input" placeholder="Search...">
    <i class="fas fa-search"></i>
`;

// Add search to header
const headerRight = document.querySelector('.header-right');
headerRight.insertBefore(searchInput, headerRight.firstChild);

// Add search functionality
const searchBox = document.querySelector('.search-input');
if (searchBox) {
    searchBox.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            alert('Search functionality would be implemented here');
        }
    });
}

// Add functionality to make tables sortable
const tableHeaders = document.querySelectorAll('.orders-table th');
tableHeaders.forEach((header, index) => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        sortTable(index);
    });
});

// Function to sort table
function sortTable(columnIndex) {
    const table = document.querySelector('.orders-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    const isAscending = !tableHeaders[columnIndex].classList.contains('asc');
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;
        
        if (columnIndex === 0) { // Order ID column - sort as string
            return isAscending ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else if (columnIndex === 3) { // Amount column - sort as number
            const aNum = parseFloat(aValue.replace('$', ''));
            const bNum = parseFloat(bValue.replace('$', ''));
            return isAscending ? aNum - bNum : bNum - aNum;
        } else { // Other columns - sort as string
            return isAscending ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        }
    });
    
    // Clear previous sort indicators
    tableHeaders.forEach(header => {
        header.classList.remove('asc', 'desc');
    });
    
    // Add sort indicator to current column
    tableHeaders[columnIndex].classList.add(isAscending ? 'asc' : 'desc');
    
    // Reorder rows in DOM
    rows.forEach(row => tbody.appendChild(row));
}

// Add dark mode toggle functionality
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
headerRight.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Add form validation for any forms
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + / to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (searchBox) searchBox.focus();
    }
    
    // Escape to close dropdowns/modals
    if (e.key === 'Escape') {
        dropdownMenu.classList.remove('show');
    }
});