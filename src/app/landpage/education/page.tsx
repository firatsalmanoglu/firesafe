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
              Yangın Güvenliği Eğitimleri
            </h1>
            <p className="text-justify mt-2">
              Yangın güvenliği eğitimleri, çalışanların, öğrencilerin, ev
              sahiplerinin ve diğer bireylerin yangın anında nasıl
              davranacaklarını, yangın öncesi, sırası ve sonrasında alacakları
              önlemleri anlamalarını sağlayan kritik bir eğitim türüdür. Yangın
              güvenliği eğitiminin türleri ve içerikleri, hedef kitleye, ortamın
              özelliklerine ve yerel mevzuatlara göre çeşitlenebilir. Yangın
              Eğitim Türleri Aşağıdaki Gibi Belirlenmektedir.
            </p>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              1. Temel Yangın Güvenliği Eğitimi
            </h2>
            <p className="text-justify mt-2">
              Bu eğitim, her bireyin alması gereken en temel yangın güvenliği
              bilgilerini içerir.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Yangının Tanımı ve Türleri:</strong> Yangının nasıl
                başladığı, hangi tür yangınların ortaya çıkabileceği (örneğin,
                A, B, C, D, F sınıfı yangınları) ve her tür yangın için uygun
                söndürme yöntemleri.
              </li>
              <li className="ml-4">
                <strong>Yangın Güvenliği Ekipmanları:</strong> Yangın
                söndürücüler, yangın alarm sistemleri, yangın çıkışları, yangın
                dolapları, topraklama sistemleri ve yangın kapıları gibi temel
                yangın güvenliği ekipmanlarının kullanımı.
              </li>
              <li className="ml-4">
                <strong>Yangın Öncesi Hazırlık:</strong> Bina planları, çıkış
                yolları, acil durum numaraları, yangın tatbikatları ve yangın
                güvenliği ekipmanlarının yerleri.
              </li>
              <li className="ml-4">
                <strong>Yangın Çıkış Yolları ve Tahliye Planları:</strong>{" "}
                Binalarda yangın çıkış yollarının nasıl kullanılacağı, tahliye
                işlemleri ve toplanma alanlarının belirlenmesi.
              </li>
              <li className="ml-4">
                <strong>Yangın İhbarı ve İlk Müdahale:</strong> Yangın alarmını
                devreye sokma, acil durum ekiplerine bilgi verme ve yangına
                müdahale için temel yöntemler.
              </li>
              <li className="ml-4">
                <strong>Yangın Tatbikatları:</strong> Çalışanlar için düzenli
                olarak yangın tatbikatlarının yapılması ve bu tatbikatlar
                sırasında doğru tahliye ve söndürme işlemlerinin pratikte
                uygulanması.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              2. Yangın Söndürme Eğitimi
            </h2>
            <p className="text-justify mt-2">
              Yangın söndürme eğitimi, yangın güvenliği konusunda daha
              derinlemesine bilgi ve pratik beceriler kazandırmayı amaçlar.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Yangın Söndürücü Türleri ve Kullanımı:</strong> ABC tipi
                kuru kimyevi toz, CO2 (karbon dioksit) ve su bazlı yangın
                söndürücüler gibi yangın söndürme araçlarının nasıl
                kullanıldığı.
              </li>
              <li className="ml-4">
                <strong>Yangına Müdahale Teknikleri:</strong> Yangının
                yayılmasını engellemek için alınacak önlemler, yangın
                söndürücülerinin nasıl etkili bir şekilde kullanılacağı.
              </li>
              <li className="ml-4">
                <strong>Yangın Sınıflarına Göre Söndürme Yöntemleri:</strong>{" "}
                Her sınıf yangına uygun söndürme yöntemlerinin öğretilmesi.
                (Örneğin, elektrik yangınlarında su kullanılmaz.)
              </li>
              <li className="ml-4">
                <strong>Acil Durumda İlk Yardım:</strong> Yangın sırasında
                karşılaşılan yaralanmalarda yapılacak ilk yardım uygulamaları.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              3. İleri Seviye Yangın Güvenliği Eğitimi
            </h2>
            <p className="text-justify mt-2">
              Bu eğitim türü, yangın güvenliği uzmanları veya yangın güvenliği
              sorumluları için daha derinlemesine ve teknik bilgi gerektirir.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Yangın Güvenliği Yönetim Sistemleri:</strong> Yangın
                güvenliği stratejilerinin nasıl planlanacağı ve uygulanacağı,
                yangın güvenliği politikaları ve prosedürleri.
              </li>
              <li className="ml-4">
                <strong>Yangın Risk Analizi ve Değerlendirmesi:</strong> Yangın
                risklerinin belirlenmesi ve yangın güvenliği önlemlerinin buna
                göre optimize edilmesi.
              </li>
              <li className="ml-4">
                <strong>Yangın Güvenliği Denetimleri:</strong> Binalarda yapılan
                yangın güvenliği denetimleri, yangın güvenliği ekipmanlarının
                periyodik bakımı, test edilmesi ve yangın tatbikatlarının
                düzenlenmesi.
              </li>
              <li className="ml-4">
                <strong>Acil Durum Planlaması:</strong> Yangın anında yapılacak
                acil durum müdahale planlarının hazırlanması ve uygulanması.
              </li>
              <li className="ml-4">
                <strong>Yangın Yöneticisi Eğitimleri:</strong> Yangın güvenliği
                departmanlarında görev alacak kişilere yönelik yangın güvenliği
                yönetimi, liderlik ve kriz yönetimi eğitimi.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              4. Yangın Tatbikatı Eğitimi
            </h2>
            <p className="text-justify mt-2">
              Yangın tatbikatları, teorik eğitimin yanı sıra pratik becerilerin
              geliştirilmesine yardımcı olur. Bu eğitim türü, çalışanların
              gerçek bir yangın anında nasıl davranacaklarını öğrenmelerine
              yardımcı olur.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Yangın Tatbikatı Senaryoları:</strong> Gerçekçi yangın
                durumlarını simüle ederek çalışanlara nasıl hareket edecekleri
                öğretilebilir. Tatbikatlar sırasında, yangın çıkışı, tahliye,
                yangın söndürme teknikleri ve ilk yardım uygulamaları gibi
                beceriler test edilir.
              </li>
              <li className="ml-4">
                <strong>Acil Durum Yöneticilerinin Rolü:</strong> Yangın
                tatbikatlarında yangın güvenliği sorumlularının ve
                yöneticilerinin rolü, çalışanlara liderlik etme ve organizasyonu
                sağlama.
              </li>
              <li className="ml-4">
                <strong>Çalışanların Değerlendirilmesi:</strong> Tatbikat
                sonrasında çalışanların yangın güvenliği bilgileri ve tatbikat
                sırasında gösterdikleri performans değerlendirilir, eksiklikler
                tespit edilir.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              5. Yangın Güvenliği Farkındalık Eğitimi
            </h2>
            <p className="text-justify mt-2">
              Bu tür eğitimler, özellikle büyük kurumlar veya kamu alanlarında
              çalışan bireyler için uygundur ve herkesin yangın güvenliği
              konusunda farkındalığını artırmayı amaçlar.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Yangının Önlenmesi:</strong> Yangınların nasıl
                önlenebileceği, yangın güvenliği kültürünün nasıl
                oluşturulacağı.
              </li>
              <li className="ml-4">
                <strong>Çalışan Davranışları:</strong> Yangın güvenliği
                davranışlarının, bireylerin günlük işlerinde nasıl alışkanlık
                haline getirilmesi gerektiği.
              </li>
              <li className="ml-4">
                <strong>Acil Durum Tepkileri ve İletişim:</strong> Yangın anında
                sakin kalma, doğru iletişim kurma ve hızlı hareket etme
                yöntemleri.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              6. Özel Durumlar için Yangın Güvenliği Eğitimi
            </h2>
            <p className="text-justify mt-2">
              Sektörel risklere ve özel durumlardaki yangın güvenliği
              ihtiyaçlarına yönelik eğitimlerdir. Örneğin:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Kimyasal Yangınlar ve Tehlikeli Maddeler:</strong> Kimya
                sektöründe çalışanlar için tehlikeli maddelerle ilgili yangın
                güvenliği eğitimi.
              </li>
              <li className="ml-4">
                <strong>Elektrik Yangınları:</strong> Elektriksel yangınların
                nasıl önleneceği ve bu tür yangınlara nasıl müdahale edileceği.
              </li>
              <li className="ml-4">
                <strong>İnşaat Sektörü Yangın Güvenliği Eğitimi:</strong> İnşaat
                alanlarında yangın güvenliğinin sağlanması, yangın riski
                oluşturabilecek unsurların nasıl kontrol edileceği.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              Eğitimlerin Düzenli Aralıklarla Yenilenmesi
            </h2>
            <p className="text-justify mt-2">
              Yangın güvenliği eğitimi, sadece başlangıçta değil, belirli
              periyotlarla (yılda bir veya iki) tekrarlanmalıdır. Çalışanlar ve
              diğer katılımcılar, yangın güvenliği becerilerini her zaman güncel
              tutmalıdır.
            </p>

            <h2 className="text-xl font-semibold text-red-600 mt-6">Sonuç</h2>
            <p className="text-justify mt-2">
              Yangın güvenliği eğitimi, hayat kurtarıcı olabilir ve bu
              eğitimlerin doğru, kapsamlı ve sürekli yapılması önemlidir. Eğitim
              türlerinin içeriği, katılımcıların görevlerine ve ortamın
              gereksinimlerine göre özelleştirilmeli ve gerçekçi tatbikatlarla
              pekiştirilmelidir.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
