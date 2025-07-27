import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types'; // Import Project type

async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data;
}

export default async function HomePage() {
  const projects: Project[] = await getProjects();

  return (
    <div className="min-h-screen">
      <Header /> {/* Header akan menampilkan nav link dan "Photography ->" */}

      {/* Bagian 1: Introduction (Screenshot 2025-07-21 191814.png) */}
      <section id="intro" className="min-h-screen flex items-center justify-center bg-gray-100 p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              introduction
              <br />
              <span className="text-black">Halo, saya</span>
              <br />
              <span className="text-gray-700">Ridwan Abdul Rohman</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
              Mahasiswa <span className="font-semibold text-gray-800">Tech</span>, yang
              pastinya terbiasa dengan penggunaan software dan hardware IT
            </p>
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto md:mx-0">
              <div className="flex flex-col items-center text-center">
                <Image src="/images/icon-troubleshooting.png" alt="Troubleshooting Icon" width={60} height={60} className="mb-2"/>
                <span className="text-gray-700 font-medium">Troubleshooting</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src="/images/icon-user-support.png" alt="Dukungan Pengguna Icon" width={60} height={60} className="mb-2"/>
                <span className="text-gray-700 font-medium">Dukungan Pengguna</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src="/images/icon-asset-management.png" alt="Manajemen Aset & Data Icon" width={60} height={60} className="mb-2"/>
                <span className="text-gray-700 font-medium">Manajemen Aset & Data</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image src="/images/icon-technical-docs.png" alt="Dokumentasi Teknis Icon" width={60} height={60} className="mb-2"/>
                <span className="text-gray-700 font-medium">Dokumentasi Teknis</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mt-8 md:mt-0">
            <Image
              src="/images/intro-ridwan.png" // Ganti dengan gambar kamu
              alt="Ridwan Abdul Rohman"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Bagian 2: Pendidikan (Screenshot 2025-07-21 191828.png) */}
      <section id="pendidikan" className="min-h-screen flex items-center justify-center bg-white p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              pendidikan
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Dasar saya adalah memang di <span className="font-semibold">bidang Teknologi</span>, dengan pendidikan di bidang IT yang fokus pada Code dan Data. Namun, passion saya meluas ke <span className="font-semibold">Photography dan Cook</span>. Keduanya mengajarkan saya <span className="font-semibold">soft skills</span>, empati dari fotografi, dan disiplin dari memasak. Perpaduan unik ini adalah <span className="font-semibold">value proposition</span> saya; seorang teknisi dengan pemahaman mendalam tentang proses, kreativitas, dan pengguna.
            </p>
            <div className="text-gray-700">
              <h3 className="text-xl font-bold mb-2">Sekolah Tinggi Manajemen dan Ilmu Komputer Mardira Indonesia - Bandung</h3>
              <p>September 2022 - Sekarang</p>
              <p>S1 Teknik Informatika - Semester 6</p>
              <p>IPK : 3.40/4.00</p>
            </div>
            <div className="text-gray-700 mt-6">
              <h3 className="text-xl font-bold mb-2">SMK Bandung Timur - Kab. Bandung</h3>
              <p>Agustus 2019 - Mei 2022</p>
              <p>Jurusan Teknik Komputer Jaringan</p>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mt-8 md:mt-0">
            <Image
              src="/images/code-education.png" // Ganti dengan gambar kamu
              alt="Coding Screen"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Bagian 3: Pengalaman Kerja (Screenshot 2025-07-21 191839.png) */}
      <section id="pengalaman" className="min-h-screen flex items-center justify-center bg-gray-100 p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mb-8 md:mb-0">
            <Image
              src="/images/cook-experience.png" // Ganti dengan gambar kamu
              alt="Cooking experience"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              pengalaman kerja
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Selama ini, saya banyak berkecimpung di dunia yang berbeda,
              yang semuanya membentuk cara kerja saya sekarang.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-4">
              <li>
                <span className="font-semibold text-gray-800">Dunia F&B yang Fast-Paced</span>
                <p className="ml-4">
                  Selama <span className="italic">hampir 2 tahun</span>, saya nyemplung di industri makanan dan minuman. Saya pernah jadi
                  <span className="font-semibold"> Cook Helper</span> di Rempha,
                  <span className="font-semibold"> Crew All Station</span> serba bisa di Nangkring Seblak, sampai jadi
                  <span className="font-semibold"> Topping Crew</span> di pabrik Amanda Brownies. Di sini, saya terbiasa:
                </p>
                <ul className="list-disc list-inside ml-8 text-gray-600 text-base">
                  <li>Ngurusin inventory management, mulai dari stock opname bulanan sampai reporting kebutuhan logistik harian.</li>
                  <li>Handle lebih dari 100 pelanggan setiap hari, jadi kerja di bawah tekanan sambil jaga customer service itu sudah biasa.</li>
                  <li>Menjaga quality control di lini produksi untuk ratusan produk per hari dan memastikan semuanya sesuai SOP.</li>
                </ul>
              </li>
            </ul>
            <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg">
              Selengkapnya di CV
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Bagian 4: Code (Screenshot 2025-07-21 191852.png) */}
      <section id="code" className="min-h-screen flex items-center justify-center bg-white p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              code
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Sebagai mahasiswa Teknik Informatika, code adalah kanvas saya. Saya telah mengerjakan berbagai personal projects untuk mengubah logika dalam membangun solusi. Bagi saya, coding adalah proses problem-solving yang paling murni.
            </p>
            <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start mt-8">
              <div className="flex flex-col items-center">
                <Image src="/images/icon-css.png" alt="CSS Icon" width={60} height={60} />
                <span className="mt-2 text-gray-700 font-medium">CSS</span>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/icon-html.png" alt="HTML Icon" width={60} height={60} />
                <span className="mt-2 text-gray-700 font-medium">HTML</span>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/icon-figma.png" alt="Figma Icon" width={60} height={60} />
                <span className="mt-2 text-gray-700 font-medium">Figma</span>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/icon-java.png" alt="Java Icon" width={60} height={60} />
                <span className="mt-2 text-gray-700 font-medium">Java</span>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/icon-cpp.png" alt="C++ Icon" width={60} height={60} />
                <span className="mt-2 text-gray-700 font-medium">C++</span>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/icon-react.svg" alt="React Icon" width={60} height={60} />
                <span className="mt-2 text-gray-700 font-medium">PHP</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mt-8 md:mt-0">
            <Image
              src="/images/code-project.png" // Ganti dengan gambar kamu
              alt="Coding project example"
              fill
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
        <div className="mt-16 w-full text-center">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-8">My Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">No projects uploaded yet.</p>
                )}
            </div>
        </div>
      </section>

      {/* Bagian 5: Data (Screenshot 2025-07-21 191913.png) */}
      <section id="data" className="min-h-screen flex items-center justify-center bg-gray-100 p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mb-8 md:mb-0">
            <Image
              src="/images/data-example.png" // Ganti dengan gambar kamu (misal: spreadsheet/document)
              alt="Data Management"
              fill
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              data
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Baik di <span className="font-semibold">dapur</span> maupun <span className="font-semibold">organisasi</span>, saya selalu berurusan dengan data. Saya bertanggung jawab melakukan stock opname bulanan, membuat reporting kebutuhan logistik, dan mengelola data keanggotaan.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>Inventory Management</li>
              <li>Reporting</li>
            </ul>
            <p className="text-lg text-gray-700 mt-6 max-w-md">
              Skill ini bisa langsung diaplikasikan untuk tugas seperti IT asset tracking, membuat log aktivitas maintenance, dan memastikan semua data di sistem internal tercatat akurat.
            </p>
          </div>
        </div>
      </section>

      {/* Bagian 6: Cook (Screenshot 2025-07-21 191903.png) */}
      <section id="cook" className="min-h-screen flex items-center justify-center bg-white p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              cook
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Dapur adalah laboratorium yang menuntut <span className="font-semibold">presisi</span>. Bekerja di industri F&B mengajarkan saya satu hal.
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Ikuti Standard Operating Procedure (SOP) untuk hasil yang konsisten. Semuanya harus terukur dan efisien, terutama di <span className="font-semibold">high-pressure environment</span>.
            </p>
          </div>
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mt-8 md:mt-0">
            <Image
              src="/images/food-spread.png" // Ganti dengan gambar kamu
              alt="Various dishes"
              fill
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* Bagian 7: Photography (Screenshot 2025-07-21 191923.png) */}
      <section id="photography" className="min-h-screen flex items-center justify-center bg-gray-100 p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mb-8 md:mb-0">
            <Image
              src="/images/photography-collage.png" // Ganti dengan gambar kamu
              alt="Photography examples"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              photography
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Di dunia fotografi, saya tidak hanya menekan tombol shutter. Saya adalah seorang <span className="font-semibold">front-liner</span> yang berhadapan langsung dengan klien. Saya belajar menerjemahkan ide abstrak mereka menjadi sebuah hasil visual yang memuaskan. Ini adalah <span className="font-semibold">soft skill krusial</span>.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-4">
              <li>
                <span className="font-semibold">Client-Facing Communication</span>
                <p className="ml-4">Berkomunikasi efektif untuk memahami pain points dan ekspektasi user (klien).</p>
              </li>
              <li>
                <span className="font-semibold">Digital Asset Management</span>
                <p className="ml-4">Mengelola workflow post-production dan mengarsipkan ratusan Gigabyte digital assets dengan aman.</p>
              </li>
              <li>
                <span className="font-semibold">Connecting to IT</span>
                <p className="ml-4">Kemampuan ini melatih empati saya, sebuah skill penting untuk user support agar bisa memahami frustrasi pengguna dan memberikan solusi yang tepat, bukan hanya teknis.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bagian 8: Videography (Screenshot 2025-07-21 191939.png) */}
      <section id="videography" className="min-h-screen flex items-center justify-center bg-white p-8 pt-24 snap-start">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
              videography
            </h2>
            <p className="text-xl text-gray-700 mb-4 font-bold">academic project</p>
            <p className="text-lg text-gray-700">Kontribusi: Cameraman, Property</p>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              <Link href="#" className="flex items-center">
                klik untuk lihat!
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </button>
          </div>
          <div className="flex-1 relative w-full h-[400px] md:h-[500px] mt-8 md:mt-0">
            <Image
              src="/images/videography-phone.png" // Ganti dengan gambar kamu (misal: mock-up HP menampilkan video)
              alt="Videography project"
              fill
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* Bagian 9: Terima Kasih / Contact (Screenshot 2025-07-21 191950.png) */}
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 pt-24 snap-start text-center">
        <h2 className="text-8xl font-extrabold text-gray-900 mb-12">
          terima kasih
        </h2>
        <p className="text-xl text-gray-700 mb-16 max-w-2xl leading-relaxed">
          My journey through Photography, Cook, Data, and Code has shaped me into a well-rounded individual. Saya tidak hanya membawa pengetahuan teknis, tapi juga kreativitas, presisi, dan empati ke meja kerja.
        </p>
        <h3 className="text-3xl font-bold text-gray-800 mb-10">kontak saya :</h3>
        <div className="flex flex-wrap justify-center gap-10">
          <a href="https://www.instagram.com/ridwanabdlr" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
            <Image src="/images/icon-instagram.png" alt="Instagram" width={60} height={60} />
            <span className="mt-3 text-lg font-medium">@ridwanabdlr</span>
          </a>
          <a href="https://github.com/ieuridwan" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
            <Image src="/images/icon-github.png" alt="GitHub" width={60} height={60} />
            <span className="mt-3 text-lg font-medium">ieuridwan</span>
          </a>
          <a href="https://wa.me/6283823595086" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
            <Image src="/images/icon-whatsapp.png" alt="WhatsApp" width={60} height={60} />
            <span className="mt-3 text-lg font-medium">+6283823595086</span>
          </a>
          <a href="mailto:ridwanabdulrohman45@gmail.com" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
            <Image src="/images/icon-email.png" alt="Email" width={60} height={60} />
            <span className="mt-3 text-lg font-medium">ridwanabdulrohman45@gmail.com</span>
          </a>
        </div>
      </section>
    </div>
  );
}