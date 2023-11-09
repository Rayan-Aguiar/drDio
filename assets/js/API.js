
const coursesCardsContainer = document.getElementById("courses-cards");
const blogsCardsContainer = document.getElementById("blogs-Card");

let allData = { courses: [], blogs: [] };

async function fetchData() {
  try {
    const response = await fetch("https://rayandev.tutorcasts.app/api/iepem");

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const data = await response.json();

    if ('courses' in data && 'blog' in data) {
      return data;
    } else {
      throw new Error("Os dados não estão no formato esperado.");
    }
  } catch (error) {
    console.error("Erro ao buscar os cursos e blogs:", error);
    return { courses: [], blog: [] };
  }
}
async function initialize() {
  
  allData = await fetchData();

  
  if (allData.courses) {
    allData.courses.forEach((course) => {
      const courseCard = createCoursesCard(course);
      coursesCardsContainer.appendChild(courseCard);
    });
  }

  if (allData.blog) {
    
    allData.blog.forEach((blog) => {
      const blogCard = createBlogCard(blog);
      blogsCardsContainer.appendChild(blogCard);
    });
  }
}

initialize();

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
                <div class="st-member-designation">${priceInBRL}</div>
                <div class="courses-content">
                    <a href="https://iepem.g1learn.app/courses" target="_blank">
                        <button class="st-btn st-style2 st-color1 st-size-medium">Saiba mais</button>
                    </a>
                </div>
                <div class="d-none">${course.id}</div>
            </div>
        </div>
    </div>
  `;

  return coursesCard;
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
function createBlogCard(blog) {
  const blogCard = document.createElement("div");
  blogCard.className = "col-lg-4";
  const postFormatDate = moment(blog.date*1000).format('DD/MM/YYYY');
  //const blogLink = `https://iepem.com.br/blog/${blog.slug}`
  const blogLink = `https://rayandev.tutorcasts.app/artigos/${blog.slug}`

  const maxDescriptionLength = 100;
  const truncatedDescription = blog.description.length > maxDescriptionLength
  ? blog.description.substring(0, maxDescriptionLength) + "..."
  : blog.description;

  blogCard.innerHTML = `  
    <div class="st-post st-style3">
      <div class="d-none">${blog.id}</div>
      <a href=${blogLink} target="_blank" class="st-post-thumb st-link-hover-wrap st-zoom">
          <img class="st-zoom-in" src=${blog.image} alt="blog1">
        <span class="st-link-hover"><i class="fas fa-link"></i></span>
      </a>
      <div class="st-post-info">
        <h2 class="st-post-title"><a href="blog-details-right-sidebar.html">${blog.title}</a></h2>
        <div class="st-post-meta">
          <span class="st-post-date">${postFormatDate}</span>
          <span>
            Feito por:<a href=${blogLink} class="st-post-avatar">
              <span class="st-post-avatar-text"> ${blog.author || 'Sem Autor'}</span>
            </a>
          </span>
        </div>
        <div class="st-post-text">${truncatedDescription}</div>
      </div>
      <div class="st-post-footer">
        <a href=${blogLink} target="_blank" class="st-btn st-style2 st-color1 st-size-medium">Saiba mais</a>
      </div>
    </div>
    <div class="st-height-b0 st-height-lg-b30"></div>  
  `;
  return blogCard;
}


allData.courses.forEach((course) => {
  const courseCard = createCoursesCard(course);
  coursesCardsContainer.appendChild(courseCard);
});


allData.blogs.forEach((blog) => {
  const blogCard = createBlogCard(blog);
  blogsCardsContainer.appendChild(blogCard);
});
