"use client";

import React, { useState, useEffect } from "react";
import {
  FlameKindling,
  Phone,
  Mail,
  Shield,
  GraduationCap,
  ClipboardCheck,
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileCheck, BadgeCheck, HandshakeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/1.jpg",
      title: "Yangın Güvenliğinde Profesyonel Çözümler",
      description: "İşletmeniz için eksiksiz yangın güvenlik sistemleri",
      buttonText: "Hemen Başlayın",
    },
    {
      image: "/2.jpg",
      title: "Uzman Eğitim Kadrosu",
      description: "Teorik ve uygulamalı yangın güvenlik eğitimleri",
      buttonText: "Eğitimleri İncele",
    },
    {
      image: "/3.jpg",
      title: "7/24 Teknik Destek",
      description: "Acil durumlarınızda yanınızdayız",
      buttonText: "Bize Ulaşın",
    },
  ];

  const services = [
    {
      title: "Yangın Güvenlik Sistemleri",
      description:
        "Modern yangın algılama ve söndürme sistemleri kurulumu ve bakımı",
      icon: Shield,
    },
    {
      title: "Güvenlik Eğitimleri",
      description:
        "Profesyonel eğitmenler eşliğinde teorik ve uygulamalı eğitimler",
      icon: GraduationCap,
    },
    {
      title: "Risk Analizi",
      description: "Detaylı risk değerlendirmesi ve güvenlik planlaması",
      icon: ClipboardCheck,
    },
    {
      title: "Acil Durum Danışmanlığı",
      description: "Acil durum ve tahliye planları oluşturma",
      icon: Users,
    },
  ];

  // Otomatik slider geçişi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Her 5 saniyede bir değişim

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />
      {/* Services Section */}
      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Hizmetlerimiz</h2>
            <p className="mt-4 text-gray-500">
              Güvenliğiniz için kapsamlı çözümler sunuyoruz
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <service.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section id="1" className="p-20">
        <div className="bg-gray-100 p-6 text-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
              Acil Durum Danışmanlığı
            </h1>
            <p className="text-justify mt-2">
              Acil Durum Danışmanlığı, kuruluşların ve bireylerin beklenmeyen
              olaylar karşısında hazırlıklı olmalarını, bu tür durumlarda etkin
              ve hızlı bir şekilde hareket etmelerini sağlayan profesyonel bir
              hizmettir. Bu danışmanlık, doğal afetler, endüstriyel kazalar,
              yangın, salgın hastalıklar, siber saldırılar ve diğer kriz
              senaryoları gibi durumlara yönelik planlama, eğitim ve uygulama
              süreçlerini içerir.
            </p>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              Acil Durum Danışmanlığının Kapsamı
            </h2>
            <p className="text-justify mt-2">
              Acil durum danışmanlığı hizmeti genellikle aşağıdaki konuları
              kapsar:
            </p>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              1. Risk Analizi ve Değerlendirme
            </h3>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Kuruluşun faaliyet alanına uygun potansiyel risklerin
                belirlenmesi
              </li>
              <li className="ml-4">
                Olası tehlikelerin etkilerinin analiz edilmesi
              </li>
              <li className="ml-4">Risk seviyelerine göre önceliklendirme</li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              2. Acil Durum Planlarının Hazırlanması
            </h3>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">Tahliye planları</li>
              <li className="ml-4">Kriz yönetimi prosedürleri</li>
              <li className="ml-4">İletişim stratejileri</li>
              <li className="ml-4">Alternatif çalışma yöntemleri</li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              3. Eğitim ve Farkındalık Çalışmaları
            </h3>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Çalışanlar için düzenli acil durum eğitimleri
              </li>
              <li className="ml-4">
                Tatbikatlarla uygulamalı eğitim programları
              </li>
              <li className="ml-4">
                Kriz sırasında psikolojik dayanıklılığı artırıcı içerikler
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              4. Acil Durum Yönetim Sistemi Kurulumu
            </h3>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">Erken uyarı sistemlerinin entegrasyonu</li>
              <li className="ml-4">Acil müdahale ekiplerinin organizasyonu</li>
              <li className="ml-4">Teknolojik altyapının güçlendirilmesi</li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              5. İzleme ve Geliştirme
            </h3>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Planların düzenli aralıklarla test edilmesi ve iyileştirilmesi
              </li>
              <li className="ml-4">
                Güncel yasal gerekliliklere uyum sağlanması
              </li>
              <li className="ml-4">
                Yeni tehdit ve risklere uygun güncellemeler
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              Acil Durum Danışmanlığının Faydaları
            </h2>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Hızlı Müdahale Yeteneği:</strong> Kriz anında kayıpların
                en aza indirilmesi sağlanır.
              </li>
              <li className="ml-4">
                <strong>Hukuki Uyum:</strong> İş sağlığı ve güvenliği
                yönetmeliklerine uygun planlama yapılır.
              </li>
              <li className="ml-4">
                <strong>Reputasyonun Korunması:</strong> Kurumsal itibarın
                korunmasına katkı sağlar.
              </li>
              <li className="ml-4">
                <strong>Finansal Güvenlik:</strong> Doğru yönetimle mali
                kayıpların önüne geçilir.
              </li>
              <li className="ml-4">
                <strong>Çalışan Güvenliği:</strong> Personelin güvenliğini
                sağlayarak motivasyonu artırır.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              Kimler Acil Durum Danışmanlığı Almalı?
            </h2>
            <p className="text-justify mt-2">
              Acil Durum Danışmanlığı, farklı sektörlerdeki kurumlar için kritik
              öneme sahiptir. Aşağıdaki kurumlar ve işletmeler acil durum
              danışmanlığı hizmeti almalıdır:
            </p>

            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>İşletmeler ve Fabrikalar:</strong> Üretim süreçlerinde
                kazaların önlenmesi ve yangın risklerinin yönetimi için.
              </li>
              <li className="ml-4">
                <strong>Okullar ve Hastaneler:</strong> Öğrenci, hasta ve
                çalışanların güvenliği için.
              </li>
              <li className="ml-4">
                <strong>Kamu Kurumları:</strong> Afet durumlarına karşı
                vatandaşların güvenliğini sağlamak amacıyla.
              </li>
              <li className="ml-4">
                <strong>Küçük ve Büyük Ölçekli Şirketler:</strong> Siber
                tehditlere karşı iş sürekliliği planlarının oluşturulması için.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
