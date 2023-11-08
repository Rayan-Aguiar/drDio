const coursesCardsContainer = document.getElementById("courses-cards");
const blogCardsContainer = document.getElementById("blogs-Card");

async function fetchCourses() {
  try {
    const response = await fetch("https://rayandev.tutorcasts.app/api/iepem");
    
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
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
  if (price === 0) {
    return "Curso gratuito";
  } else {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
                            <a href="https://iepem.g1learn.app/courses" target="_blank"><button class="st-btn st-style2 st-color1 st-size-medium">Saiba mais</button></a>
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

function createBlogCard(blog) {
  const blogCard = document.createElement("div");
  blogCard.className = "col-lg-4";

  blogCard.innerHTML = `  
  <div class="st-post st-style3">
    <a href="blog-details-right-sidebar.html" class="st-post-thumb st-link-hover-wrap st-zoom">
      <img class="st-zoom-in" src="assets/img/blog1.jpg" alt="blog1">
      <span class="st-link-hover"><i class="fas fa-link"></i></span>
    </a>
    <div class="st-post-info">
      <h2 class="st-post-title"><a href="blog-details-right-sidebar.html">Working in emergency medicine</a></h2>
      <div class="st-post-meta">
        <span class="st-post-date">Aug 21, 2020</span>
        <span>
          Posted by:<a href="#" class="st-post-avatar">
            <span class="st-post-avatar-text"> James Lewis</span>
          </a>
        </span>
      </div>
      <div class="st-post-text">Lorem Ipsum is simply dummy text of the print ing and typesetting industry.
        lorem Ipsum the industry's standard dummy text.</div>
    </div>
    <div class="st-post-footer">
      <a href="blog-details-right-sidebar.html" class="st-btn st-style2 st-color1 st-size-medium">Read More</a>
    </div>
  </div>
  <div class="st-height-b0 st-height-lg-b30"></div>  
  `;
  return blogCard;
}

async function renderBlogCard(){
  const blogs = await fetchBlogs();

  blogs.forEach((blog) => {
    const blogCard = createBlogCard(blog);
    blogCardContainer.appendChild(blogCard);
  });
}

renderBlogCard();