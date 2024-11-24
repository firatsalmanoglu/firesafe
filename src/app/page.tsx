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

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const platformFeatures = [
    {
      title: "Hizmet Alan Firmalar İçin",
      features: [
        "Çoklu teklif alma ve karşılaştırma",
        "Hizmet sağlayıcı değerlendirmeleri",
        "Online sözleşme yönetimi",
        "Proje takip sistemi",
        "Ödeme güvence sistemi",
      ],
    },
    {
      title: "Hizmet Veren Firmalar İçin",
      features: [
        "İhale ve proje fırsatları",
        "Müşteri portföyü yönetimi",
        "Otomatik teklif hazırlama",
        "Sözleşme şablonları",
        "Tahsilat takibi",
      ],
    },
  ];

  const howItWorks = [
    {
      title: "Üyelik ve Profil",
      description: "Firmanızı platforma ekleyin ve profilinizi oluşturun",
      icon: Building2,
    },
    {
      title: "Teklif Süreci",
      description: "Hizmet ilanı verin veya mevcut ilanlara teklif gönderin",
      icon: FileCheck,
    },
    {
      title: "Sözleşme",
      description: "Online sözleşme oluşturun ve güvenli imzalayın",
      icon: HandshakeIcon,
    },
    {
      title: "Proje Takibi",
      description: "Projelerinizi platform üzerinden yönetin",
      icon: BadgeCheck,
    },
  ];

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center justify-center lg:justify-start gap-2"
              >
                <Image src="/logo.png" alt="logo" width={200} height={200} />
                {/* <span>SchoolLama</span> */}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-red-600">
                  Ana Sayfa
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  Hizmetler
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  Eğitimler
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  İletişim
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:112"
                className="flex items-center text-red-600 font-semibold"
              >
                <Phone className="h-5 w-5 mr-2" />
                Acil: 112
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-red-600"
              >
                Ana Sayfa
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-red-600"
              >
                Hizmetler
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-red-600"
              >
                Eğitimler
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-red-600"
              >
                İletişim
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Full Screen Slider */}
      <div className="relative h-screen">
        {/* Slider Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />{" "}
            {/* Overlay */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                <button className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
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
      {/*Platform hakkinda */}
      <div className="min-h-screen bg-white">
        {/* Existing Navigation remains same */}

        {/* Existing Slider remains same */}

        {/* Platform Features */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Platform Özellikleri
              </h2>
              <p className="mt-4 text-gray-500">
                Her iki taraf için de avantajlı çözümler
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {platformFeatures.map((section, idx) => (
                <Card key={idx} className="p-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.features.map((feature, featureIdx) => (
                        <li
                          key={featureIdx}
                          className="flex items-center gap-2"
                        >
                          <div className="h-2 w-2 bg-red-600 rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Nasıl Çalışır?
              </h2>
              <p className="mt-4 text-gray-500">
                4 basit adımda hizmet alın veya verin
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-red-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hemen Platforma Katılın
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              İster hizmet alın, ister hizmet verin. FireGuard B2B platformu ile
              tüm yangın güvenliği ihtiyaçlarınızı karşılayın.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={"/admin"}>
                <Button variant="secondary" size="lg">
                  Hizmet Almak İstiyorum
                </Button>
              </Link>
              <Link href={"/admin"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-red-600"
                >
                  Hizmet Vermek İstiyorum
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Existing Stats Section */}

        {/* Trust Indicators */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Neden Firesafe?
              </h2>
              <p className="mt-4 text-gray-500">
                Güvenilir ve profesyonel hizmet platformu
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <Shield className="w-12 h-12 text-red-600 mb-4" />
                  <CardTitle>Güvenli Ödeme</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Ödemeleriniz proje tamamlanana kadar güvende tutulur ve
                    garantilenir.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <BadgeCheck className="w-12 h-12 text-red-600 mb-4" />
                  <CardTitle>Lisanslı Firmalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Tüm hizmet sağlayıcılar detaylı bir doğrulama sürecinden
                    geçer.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <FileCheck className="w-12 h-12 text-red-600 mb-4" />
                  <CardTitle>Yasal Güvence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Hukuki açıdan güvenli sözleşme şablonları ve anlaşmazlık
                    çözümü.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Existing Footer */}
      </div>

      {/* Stats Section */}
      {/* <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600">1000+</div>
              <div className="mt-2 text-gray-500">Tamamlanan Proje</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">5000+</div>
              <div className="mt-2 text-gray-500">Eğitilen Personel</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">15+</div>
              <div className="mt-2 text-gray-500">Yıllık Tecrübe</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">24/7</div>
              <div className="mt-2 text-gray-500">Teknik Destek</div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Yangın Algılama
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Söndürme Sistemleri
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Risk Analizi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Eğitimler</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Yangın Eğitimi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    İlk Yardım
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Acil Durum
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kurumsal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Belgelerimiz
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Referanslar
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-red-500" />
                  <span className="text-gray-400">+90 123 456 7890</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-red-500" />
                  <span className="text-gray-400">info@fireguard.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 FireGuard. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
