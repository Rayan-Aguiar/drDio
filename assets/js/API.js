const coursesCardsContainer = document.getElementById("courses-cards");




async function fetchCourses() {
  try {
    const response = await fetch("https://hudson.tutorcasts.app/api/iepem");
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }
    const data = await response.json();
    if (data.hasOwnProperty("courses") && Array.isArray(data.courses)) {
      return data.courses;
    } else {
      throw new Error("Os dados não estão no formato esperado.");
    }
  } catch (error) {
    console.error("Erro ao buscar os cursos:", error);
    return [];
  }
}

function formatPriceToBRL(price) {
    if(price === 0){
        return "Curso gratuito";
    }else{
        return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    }
}

function createCoursesCard(course) {
  const coursesCard = document.createElement("div");
  coursesCard.className = "col-lg-3";
  const priceInBRL = formatPriceToBRL(course.price);

  coursesCard.innerHTML = `
            <div class="st-member st-style1 st-zoom cards">
                <div class="st-member-img">
                    <img src=${course.image} alt="" class="st-zoom-in">
                </div>
                <div class="st-member-meta">
                    <div class="st-member-meta-in d-flex flex-column">
                        <h3 class="st-member-name">${course.name}</h3>

                        <div class="st-member-designation">
                        ${priceInBRL}
                        </div>
                        
                        <div class="courses-content">
                            <a href="https://iepem.g1learn.app/courses" target="_blank"><button class="btn btn-outline-primary">Saiba mais</button></a>
                        </div>
                        
                        <div class="d-none">${course.id}</div>
                    </div>
                </div>
            </div>
    `;

  return coursesCard;
}

async function renderCoursesCards() {
  const courses = await fetchCourses();

  courses.forEach((course) => {
    const courseCard = createCoursesCard(course);
    coursesCardsContainer.appendChild(courseCard);
  });
}

renderCoursesCards();
