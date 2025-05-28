
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Save, Upload, Settings, Bell, Shield, Globe } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    general: {
      storeName: 'My E-commerce Store',
      storeDescription: 'Your one-stop shop for quality products',
      currency: 'USD',
      timezone: 'UTC',
      language: 'en'
    },
    notifications: {
      orderNotifications: true,
      lowStockAlerts: true,
      customerSignups: false,
      reviewNotifications: true,
      emailReports: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      ipWhitelist: '',
      apiRateLimit: '1000'
    },
    appearance: {
      darkMode: false,
      compactView: false,
      showBranding: true
    }
  });

  const handleSaveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleFileUpload = (type: string) => {
    toast.info(`${type} upload functionality will be implemented`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Admin Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={settings.general.storeName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, storeName: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.general.currency} onValueChange={(value) => setSettings({
                    ...settings,
                    general: { ...settings.general, currency: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={settings.general.storeDescription}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, storeDescription: e.target.value }
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.general.timezone} onValueChange={(value) => setSettings({
                    ...settings,
                    general: { ...settings.general, timezone: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST - Eastern Time</SelectItem>
                      <SelectItem value="PST">PST - Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT - Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.general.language} onValueChange={(value) => setSettings({
                    ...settings,
                    general: { ...settings.general, language: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSaveSettings('General')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderNotifications">Order Notifications</Label>
                  <p className="text-sm text-gray-500">Get notified when new orders are placed</p>
                </div>
                <Switch
                  id="orderNotifications"
                  checked={settings.notifications.orderNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, orderNotifications: checked }
                  })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                  <p className="text-sm text-gray-500">Alert when products are running low</p>
                </div>
                <Switch
                  id="lowStockAlerts"
                  checked={settings.notifications.lowStockAlerts}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, lowStockAlerts: checked }
                  })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="customerSignups">Customer Signups</Label>
                  <p className="text-sm text-gray-500">Notify when new customers register</p>
                </div>
                <Switch
                  id="customerSignups"
                  checked={settings.notifications.customerSignups}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, customerSignups: checked }
                  })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reviewNotifications">Review Notifications</Label>
                  <p className="text-sm text-gray-500">Alert when new reviews are posted</p>
                </div>
                <Switch
                  id="reviewNotifications"
                  checked={settings.notifications.reviewNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, reviewNotifications: checked }
                  })}
                />
              </div>
              <Button onClick={() => handleSaveSettings('Notification')}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: checked }
                  })}
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: e.target.value }
                  })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea
                  id="ipWhitelist"
                  placeholder="Enter IP addresses (one per line)"
                  value={settings.security.ipWhitelist}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, ipWhitelist: e.target.value }
                  })}
                  className="mt-2"
                />
              </div>
              <Button onClick={() => handleSaveSettings('Security')}>
                <Save className="h-4 w-4 mr-2" />
                Update Security
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, darkMode: checked }
                  })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compactView">Compact View</Label>
                  <p className="text-sm text-gray-500">Use smaller spacing and components</p>
                </div>
                <Switch
                  id="compactView"
                  checked={settings.appearance.compactView}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, compactView: checked }
                  })}
                />
              </div>
              <Separator />
              <div>
                <Label>Logo Upload</Label>
                <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload your store logo</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => handleFileUpload('Logo')}>
                    Upload Logo
                  </Button>
                </div>
              </div>
              <Button onClick={() => handleSaveSettings('Appearance')}>
                <Save className="h-4 w-4 mr-2" />
                Save Appearance
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
