-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Des 2021 pada 08.23
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_music`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_artis`
--

CREATE TABLE `tb_artis` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_career` date DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_genre`
--

CREATE TABLE `tb_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_music`
--

CREATE TABLE `tb_music` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `music` varchar(255) DEFAULT NULL,
  `cover_music` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `genre_id` int(11) DEFAULT NULL,
  `artis_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_music`
--

INSERT INTO `tb_music` (`id`, `title`, `music`, `cover_music`, `created_at`, `update_at`, `genre_id`, `artis_id`) VALUES
(8, 'Astronaut In The Ocean', '1638774462645-MaskedWolf-AstronautInTheOcean.mp3', '1638774462632-cover.webp', '2021-12-06 07:07:42', '2021-12-06 07:07:42', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_playlist`
--

CREATE TABLE `tb_playlist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `music_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT 'default.png',
  `summary` varchar(1000) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_artis`
--
ALTER TABLE `tb_artis`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_genre`
--
ALTER TABLE `tb_genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `artis_id` (`artis_id`);

--
-- Indeks untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `music_id` (`music_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_artis`
--
ALTER TABLE `tb_artis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `tb_genre`
--
ALTER TABLE `tb_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  ADD CONSTRAINT `tb_music_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `tb_genre` (`id`),
  ADD CONSTRAINT `tb_music_ibfk_2` FOREIGN KEY (`artis_id`) REFERENCES `tb_artis` (`id`);

--
-- Ketidakleluasaan untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  ADD CONSTRAINT `tb_playlist_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `tb_music` (`id`),
  ADD CONSTRAINT `tb_playlist_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
