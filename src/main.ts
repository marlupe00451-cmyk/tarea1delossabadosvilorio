import './style.css';
import type { User } from './interfaces/user.interface';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <main class="container">
    <h1>Usuarios de JSONPlaceholder</h1>
    <p class="description">
      Información obtenida desde una API REST mediante fetch() y TypeScript.
    </p>

    <div id="users-container">
      <p class="loading">Cargando usuarios...</p>
    </div>
  </main>
`;

async function getUsers(): Promise<void> {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }

    const users: User[] = await response.json();

    const usersContainer =
      document.querySelector<HTMLDivElement>('#users-container')!;

    usersContainer.innerHTML = users
      .map(
        (user) => `
          <article class="user-card">
            <h2>${user.name}</h2>

            <p>
              <strong>Usuario:</strong> ${user.username}
            </p>

            <p>
              <strong>Correo:</strong> ${user.email}
            </p>

            <p>
              <strong>Teléfono:</strong> ${user.phone}
            </p>

            <p>
              <strong>Ciudad:</strong> ${user.address.city}
            </p>

            <p>
              <strong>Empresa:</strong> ${user.company.name}
            </p>
          </article>
        `
      )
      .join('');
  } catch (error) {
    const usersContainer =
      document.querySelector<HTMLDivElement>('#users-container')!;

    usersContainer.innerHTML = `
      <p class="error">
        No se pudieron cargar los usuarios.
      </p>
    `;

    console.error(error);
  }
}

getUsers();
