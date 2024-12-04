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
              Yangın Risk Analizi Nedir?
            </h1>
            <p className="text-justify mt-2">
              Yangın risk analizi, bir ortamda yangın çıkma olasılığını ve bunun
              olumsuz etkilerini minimize etmek için yapılan sistematik bir
              değerlendirmedir. Bu analiz, potansiyel yangın tehlikelerini
              tanımlamak, riskleri değerlendirmek ve bu riskleri azaltacak
              önlemleri belirlemek amacıyla yapılır. Yangın risk analizi, hem
              yangın öncesi, hem de yangın anında etkili bir güvenlik planı
              oluşturulmasına yardımcı olur.
            </p>
            <p className="text-justify mt-2">
              Yangın risk analizi, yasal bir zorunluluk olmasının yanı sıra, iş
              yerlerinde, okullarda, hastanelerde, fabrikalarda ve diğer birçok
              alanda güvenliği artırmak için kritik bir adımdır. Ayrıca,
              çalışanların, müşterilerin ve diğer bireylerin güvenliğini
              sağlamak, mülk kaybını önlemek ve yangının yayılma hızını
              yavaşlatmak amacıyla yapılır.
            </p>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              Yangın Risk Analizinin Amaçları
            </h2>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Yangın tehlikelerinin belirlenmesi:</strong> Yangın
                çıkabilecek yerlerin ve koşulların tespit edilmesi.
              </li>
              <li className="ml-4">
                <strong>Riskin büyüklüğünün değerlendirilmesi:</strong> Yangının
                meydana geldiğinde yaratacağı tehlikelerin ve hasarın boyutunun
                analiz edilmesi.
              </li>
              <li className="ml-4">
                <strong>Yangın güvenlik önlemlerinin geliştirilmesi:</strong>{" "}
                Yangının çıkmasını engelleyecek veya etkilerini azaltacak
                önlemlerin tasarlanması.
              </li>
              <li className="ml-4">
                <strong>
                  Yangın tatbikatları ve eğitim ihtiyaçlarının belirlenmesi:
                </strong>{" "}
                Çalışanların, öğrencilerin ve diğer bireylerin yangına karşı
                eğitim almasını sağlamak.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">
              Yangın Risk Analizi Nasıl Yapılır?
            </h2>
            <p className="text-justify mt-2">
              Yangın risk analizi, genellikle birkaç temel adımda
              gerçekleştirilir. Bu adımlar aşağıdaki gibi sıralanabilir:
            </p>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              1. Hazırlık ve Planlama
            </h3>
            <p className="text-justify mt-2">
              Yangın risk analizine başlamadan önce, tüm sürecin planlanması
              gereklidir. Bu aşamada aşağıdaki unsurlar göz önünde bulundurulur:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                İlgili Yer ve Alanın Belirlenmesi: Yangın risk analizi yapılacak
                bina veya tesisin sınırları çizilir.
              </li>
              <li className="ml-4">
                Kapsamın Tanımlanması: Risk analizi sadece yangın tehlikeleri
                ile sınırlı kalmamalıdır. Ayrıca yangın güvenlik önlemleri,
                yangın söndürücüler, alarm sistemleri, tahliye planları gibi
                alanlar da kapsanmalıdır.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              2. Tehlikelerin Belirlenmesi
            </h3>
            <p className="text-justify mt-2">
              Yangın çıkma olasılığını artırabilecek tüm faktörler belirlenir.
              Bu adımda şunlar göz önünde bulundurulmalıdır:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Yangın Kaynakları: Elektrik arızaları, ısınma sistemleri,
                kimyasal maddeler, açık alevler gibi unsurlar.
              </li>
              <li className="ml-4">
                Yanıcı Maddeler: Kağıt, plastik, ahşap, kimyasal maddeler gibi
                yanıcı malzemeler.
              </li>
              <li className="ml-4">
                Elektrik Tesisatları ve Cihazlar: Kısa devre, eski tesisatlar
                gibi elektrikli ekipmanlar.
              </li>
              <li className="ml-4">
                Yapısal Özellikler: Bina yapısının yangına dayanıklılığı, yangın
                çıkış yolları gibi yapısal faktörler.
              </li>
              <li className="ml-4">
                Yangına Müdahale Ekipmanları: Yangın söndürücüler, sprink
                sistemleri, yangın alarmı gibi müdahale araçlarının yeterliliği.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              3. Risk Değerlendirmesi
            </h3>
            <p className="text-justify mt-2">
              Tehlikeler belirlendikten sonra, bu tehlikelerin oluşturabileceği
              riskler değerlendirilir. Bu değerlendirme, her bir tehlikenin
              olasılık ve etkisinin hesaplanmasını içerir.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Olasılık:</strong> Yangın çıkma olasılığı.
              </li>
              <li className="ml-4">
                <strong>Etkiler:</strong> Yangın çıktığında doğacak olumsuz
                etkiler (can kaybı, malzeme kaybı vb.).
              </li>
              <li className="ml-4">
                <strong>Risk Düzeyi:</strong> Olasılık ve etki dikkate alınarak,
                her bir tehlikenin risk seviyesi belirlenir.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              4. Riskin Kontrolü ve Azaltılması
            </h3>
            <p className="text-justify mt-2">
              Risk analizinin en kritik aşaması, belirlenen riskleri kontrol
              altına almak ve azaltmaktır. Bu aşamada alınması gereken önlemler
              belirlenir:
            </p>

            <h4 className="text-md font-semibold text-red-600 mt-6">
              Yangın Öncesi Önlemler:
            </h4>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Yangına sebep olabilecek maddelerin düzenli bakımlarının
                yapılması.
              </li>
              <li className="ml-4">
                Elektrik tesisatlarının uygun şekilde tasarlanması ve
                denetlenmesi.
              </li>
              <li className="ml-4">
                Yanıcı maddelerin güvenli bir şekilde depolanması.
              </li>
              <li className="ml-4">
                Çalışanların yangın eğitimi ve tatbikatlarının düzenlenmesi.
              </li>
              <li className="ml-4">
                Bina içindeki yangın çıkış yollarının açık tutulması.
              </li>
            </ul>

            <h4 className="text-md font-semibold text-red-600 mt-6">
              Yangın Sırasında Alınacak Önlemler:
            </h4>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Acil durum tahliye planlarının uygulanabilir hale getirilmesi.
              </li>
              <li className="ml-4">
                Yangın söndürme cihazlarının kolay erişilebilir olması.
              </li>
            </ul>

            <h4 className="text-md font-semibold text-red-600 mt-6">
              Yangın Sonrası Önlemler:
            </h4>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                Yangın sonrası tahliye, kurtarma ve ilk yardım prosedürlerinin
                oluşturulması.
              </li>
              <li className="ml-4">
                Yangın sonrası zarar tespitlerinin yapılması ve iyileştirilme
                sürecinin başlatılması.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              5. İzleme ve Gözden Geçirme
            </h3>
            <p className="text-justify mt-2">
              Yangın risk analizi, sürekli olarak gözden geçirilmelidir. Yeni
              tehlikeler ortaya çıktıkça güvenlik önlemleri güncellenmeli ve
              iyileştirilmelidir.
            </p>

            <h3 className="text-lg font-semibold text-red-600 mt-6">
              Yangın Risk Analizi Yöntemleri
            </h3>
            <p className="text-justify mt-2">
              Yangın risk analizi yapılırken farklı yöntemler kullanılabilir.
              Yaygın kullanılan bazı yöntemler şunlardır:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="ml-4">
                <strong>Kuantitatif Yöntem:</strong> Riskin matematiksel olarak
                hesaplandığı yöntem.
              </li>
              <li className="ml-4">
                <strong>Kalitatif Yöntem:</strong> Riskin nitel bir şekilde
                değerlendirildiği yöntem.
              </li>
              <li className="ml-4">
                <strong>Hibrit Yöntem:</strong> Hem nicel hem de nitel
                bilgilerin birleşimi ile yapılan değerlendirme.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-red-600 mt-6">Sonuç</h2>
            <p className="text-justify mt-2">
              Yangın risk analizi, bir işletmenin, okulun, hastanenin veya
              herhangi bir diğer yapının yangın tehlikelerine karşı daha güvenli
              hale gelmesi için temel bir adımdır. Bu süreç, yalnızca yasal bir
              zorunluluk değil, aynı zamanda can ve mal güvenliğini korumak için
              önemli bir araçtır.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
