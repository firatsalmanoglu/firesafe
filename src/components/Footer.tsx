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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Yangın Güvenlik Sistemleri
                </a>
              </li>
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  Güvenlik Eğitimleri
                </a>
              </li>
              <li>
                <a
                  href="/landpage/analytics#1"
                  className="text-gray-400 hover:text-white"
                >
                  Risk Analizi
                </a>
              </li>
              <li>
                <a
                  href="/landpage/concultancy#1"
                  className="text-gray-400 hover:text-white"
                >
                  Acil Durum Danışmanlığı
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Eğitimler</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  Temel Yangın Güvenliği Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  Yangın Söndürme Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  İleri Seviye Yangın Güvenliği Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  Yangın Tatbikatı Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  Yangın Güvenliği Farkındalık Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/landpage/education#1"
                  className="text-gray-400 hover:text-white"
                >
                  Özel Durumlar için Yangın Güvenliği Eğitimi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/landpage/about#1"
                  className="text-gray-400 hover:text-white"
                >
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
                <span className="text-gray-400">firesafe@firesafe.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 FireSafe. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
