document.getElementById('fontType').addEventListener('change', function() {
    document.getElementById('resume').style.fontFamily = this.value;
});

document.getElementById('lineSpacing').addEventListener('change', function() {
    document.getElementById('resume').style.lineHeight = this.value;
});

document.getElementById('fontSize').addEventListener('input', function() {
    document.getElementById('resume').style.fontSize = this.value + 'px';
});

document.getElementById('titleStyle').addEventListener('change', function() {
    const h2Elements = document.querySelectorAll('#resume h2');
    
    // Clear existing styles
    h2Elements.forEach(h2 => {
        h2.style.borderBottom = '';
        h2.style.backgroundColor = '';
    });

    switch (this.value) {
        case 'ruled':
            h2Elements.forEach(h2 => h2.style.borderBottom = '2px solid #000');
            break;
        case 'shaded':
            h2Elements.forEach(h2 => h2.style.backgroundColor = '#f0f0f0');
            break;
        default:
            break;
    }
});


document.getElementById('titlePosition').addEventListener('change', function() {
    const h1Element = document.querySelector('#resume h1');
    const titleSeparator = document.querySelector('.section-separator');
    if (this.value === 'above') {
        h1Element.parentNode.insertBefore(titleSeparator, h1Element.nextSibling);
    } else if (this.value === 'below') {
        h1Element.parentNode.insertBefore(titleSeparator, h1Element);
    }
});

document.getElementById('toggleSectionsButton').addEventListener('click', function() {
    const sectionsContainer = document.getElementById('sectionsContainer');
    if (sectionsContainer.style.display === 'none') {
        sectionsContainer.style.display = 'block';
    } else {
        sectionsContainer.style.display = 'none';
    }
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const sectionId = this.id.replace('toggle', '').toLowerCase();
        const sectionElement = document.getElementById(sectionId);
        if (this.checked) {
            sectionElement.style.display = 'block';
        } else {
            sectionElement.style.display = 'none';
        }
    });
});

function generatePDF() {
    const element = document.getElementById('resume');
    html2pdf()
        .from(element)
        .save();
}