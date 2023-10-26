const coursesCardsContainer = document.getElementById("couses-cards");

async function fetchCourses() {
    try {
        const response = await fetch('https://hudson.tutorcasts.app/api/iepem'); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar os cursos:", error);
        return [];
    }
}

function createCoursesCard(courses) {
    const coursesCard = document.createElement("div");
    coursesCard.className = "st-member-img";

    coursesCard.innerHTML = `
        <img src="${courses.image}" alt="" class="st-zoom-in">
        <a class="st-courses-link" href="${courses.name}"><i class="fas fa-link"></i></a>
        <div class="st-member-social-wrap">
            <img src="assets/img/shape/member-shape.svg" alt="shape" class="st-member-social-bg">
            <a href="#" ><button>Saiba mais</button></a>
        </div>
        <div class="st-member-meta">
            <div class="st-member-meta-in">
                <h3 class="st-member-name">${courses.name}</h3>
                <div class="st-member-designation">${courses.price}</div>
            </div>
        </div>
    `;

    return coursesCard;
}


async function renderCoursesCards() {
    const courses = await fetchCourses();

    courses.forEach(course => {
        const courseCard = createDoctorCard(course);
        courseCardsContainer.appendChild(courseCard);
    });
}


renderCoursesCards();