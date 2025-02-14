const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 mt-12 text-white font-body text-center">
      <h1 className="text-4xl font-bold">Gizlilik Politikası</h1>
      <span>Son Güncelleme: 10.02.2025</span>
      <h2>Web sitemizi ziyaret ettiğinizde aşağıdaki bilgileri toplayabiliriz:</h2>
      <p>
        <strong className="underline">Gönüllü Olarak Sağlanan Bilgiler:</strong>{" "}
        İsim, e-posta adresi ve iletişim formları veya e-posta yoluyla paylaştığınız diğer bilgiler.
      </p>
      <p>
        <strong className="underline">Otomatik Olarak Toplanan Bilgiler:</strong>{" "}
        IP adresiniz, tarayıcı türünüz, ziyaret ettiğiniz sayfalar ve diğer analiz verileri (Google Analytics gibi hizmetler aracılığıyla).
      </p>
      <p>
        <strong className="underline">Çerezler:</strong> Web sitesinin düzgün çalışmasını sağlamak ve kullanıcı deneyimini iyileştirmek için çerezler kullanılabilir.
      </p>
      <h2 className="underline text-xl font-bold">2. Bilgilerin Kullanımı</h2>
      <strong className="underline">Toplanan veriler aşağıdaki amaçlarla kullanılabilir:</strong>
      <ul className="list-disc text-start">
        <li>Web sitesi içeriğini geliştirmek ve kişiselleştirmek</li>{" "}
        <li>Kullanıcı deneyimini iyileştirmek</li>{" "}
        <li>İletişim taleplerine yanıt vermek</li>{" "}
        <li>Yasal gerekliliklere uymak</li>
      </ul>
      <h2 className="underline text-xl font-bold">3. Çerezler ve İzleme Teknolojileri</h2>
      <p>
        Web sitemiz çerezleri kullanmaktadır. Çerezleri tarayıcı ayarlarınızdan yönetebilir veya devre dışı bırakabilirsiniz. Ancak bazı çerezleri devre dışı bırakmak, web sitesinin bazı işlevlerinin düzgün çalışmamasına neden olabilir.
      </p>
      <h2 className="underline text-xl font-bold">4. Üçüncü Taraf Hizmetleri</h2>
      <p>
        Web sitemiz, ziyaretçi istatistiklerini analiz etmek ve kullanıcı deneyimini geliştirmek için üçüncü taraf hizmetlerini (örneğin Google Analytics) kullanabilir. Bu hizmetlerin kendi gizlilik politikaları bulunmaktadır.
      </p>
      <h2 className="underline text-xl font-bold">5. Veri Koruma</h2>
      <p>
        Kişisel verilerinizi yetkisiz erişime, değiştirilmeye veya silinmeye karşı korumak için uygun güvenlik önlemleri alınmaktadır. Ancak, internet üzerinden yapılan veri iletimlerinin tamamen güvenli olduğunu garanti edemeyiz.
      </p>
      <h2 className="underline text-xl font-bold">6. Kullanıcı Hakları</h2>
      <p>
        Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz: Verilerinizin nasıl işlendiği hakkında bilgi talep etme, Verilerinizin düzeltilmesini veya silinmesini isteme, Çerezleri devre dışı bırakma veya tarayıcı ayarlarını değiştirme. Bu haklardan herhangi birini kullanmak için bizimle iletişime geçebilirsiniz.
      </p>
      <h2 className="underline text-xl font-bold">7. İletişim Bilgileri</h2>
      <p>
        Gizlilik politikamız hakkında herhangi bir sorunuz varsa, aşağıdaki adres üzerinden bizimle iletişime geçebilirsiniz:
      </p>
      <ul className="list-disc text-start">
        <li>📧 E-posta: utkutoygunbektasoglu@gmail.com </li>
        <li>🌐 Web Sitesi: www.utkubektasoglu.com</li>
      </ul>
      <p className="underline">
        Bu gizlilik politikası gerektiğinde güncellenebilir. Güncellemeleri takip etmek için sayfamızı düzenli olarak ziyaret edebilirsiniz.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
